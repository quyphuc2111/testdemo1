import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;
    // Default to strict BKT cloud URL if not provided.
    // Use "https://cloud.bkt.net.vn" as default.
    const nextcloudUrl = body.nextcloudUrl || "https://cloud.bkt.net.vn";

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập tài khoản và mật khẩu" },
        { status: 400 }
      );
    }

    // 1. Call Moodle Login API
    const moodleLoginPromise = fetch(
      "https://accountbackend.bkt.net.vn/api/Moodle/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    // 2. Call Forum Login API (XenForo)
    const forumLoginPromise = (async () => {
      try {
        // Step A: Get Login Page to fetch cookies and CSRF token
        const loginPageUrl = "https://forum.bkt.net.vn/login/";
        const getRes = await fetch(loginPageUrl, {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        });

        const html = await getRes.text();

        // Extract _xfToken using regex
        const tokenMatch = html.match(/name="_xfToken" value="([^"]+)"/);
        const xfToken = tokenMatch ? tokenMatch[1] : null;

        if (!xfToken) {
          console.error("Could not find _xfToken on forum login page");
          return {
            success: false,
            message: "Forum token not found",
            status: 500,
          };
        }

        // Get cookies from initial response
        let initialCookies: string[] = [];
        if (
          "getSetCookie" in getRes.headers &&
          typeof getRes.headers.getSetCookie === "function"
        ) {
          initialCookies = getRes.headers.getSetCookie();
        } else {
          const raw = getRes.headers.get("set-cookie");
          if (raw) initialCookies = [raw];
        }

        // Step B: POST Login
        const params = new URLSearchParams();
        params.append("login", username);
        params.append("password", password);
        params.append("remember", "1");
        params.append("_xfToken", xfToken);
        params.append("_xfRedirect", "https://forum.bkt.net.vn/");

        const postRes = await fetch("https://forum.bkt.net.vn/login/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Cookie: initialCookies.join("; "),
          },
          body: params,
          redirect: "manual", // Important to capture 303
        });

        return {
          res: postRes,
          success:
            postRes.status === 303 ||
            postRes.status === 302 ||
            postRes.status === 200,
        };
      } catch (error) {
        console.error("Forum login error:", error);
        return { success: false, error };
      }
    })();

    // 3. Call Nextcloud Login API
    const nextcloudLoginPromise = (async () => {
      if (!nextcloudUrl) return { success: false, message: "No Nextcloud URL" };

      try {
        // Normalize URL - remove trailing slash
        const baseUrl = nextcloudUrl.replace(/\/+$/, "");
        const authHeader =
          "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
        const endpoint = `${baseUrl}/ocs/v2.php/cloud/user?format=json`;

        console.log(`Trying Nextcloud endpoint: ${endpoint}`);

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: authHeader,
            "OCS-APIRequest": "true",
            "User-Agent": "Mozilla/5.0 (compatible; BKT-Auth/1.0)",
          },
        });

        const responseText = await response.text();

        if (response.status === 200 || response.status === 207) {
          let userData = {};
          try {
            const data = JSON.parse(responseText);
            userData = data.ocs?.data || data;
          } catch {
            userData = { authenticated: true };
          }
          return {
            success: true,
            user: userData,
            res: response,
          };
        }

        return {
          success: false,
          status: response.status,
          message: responseText.substring(0, 100),
        };
      } catch (error) {
        console.error("Nextcloud login error:", error);
        return { success: false, error };
      }
    })();

    // Wait for all three
    const [moodleRes, forumResWrapper, nextcloudResWrapper] = await Promise.all(
      [moodleLoginPromise, forumLoginPromise, nextcloudLoginPromise]
    );

    // Handle Moodle Response
    let moodleData = null;
    try {
      moodleData = await moodleRes.json();
    } catch (e) {
      console.error("Failed to parse Moodle response", e);
    }

    // Type definitions for results
    type ResultType = {
      success: boolean;
      res?: Response;
      error?: unknown;
      message?: string;
      status?: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user?: any;
    };

    const forumResult = forumResWrapper as ResultType;
    const nextcloudResult = nextcloudResWrapper as ResultType;

    const success = moodleData?.success || false;

    const responseData = {
      success: success,
      message: success
        ? "Đăng nhập thành công"
        : moodleData?.message || "Đăng nhập thất bại",
      moodle: {
        success: moodleData?.success,
        message: moodleData?.message,
      },
      forum: {
        success: forumResult.success,
        status: forumResult.status,
      },
      nextcloud: {
        success: nextcloudResult.success,
        user: nextcloudResult.user,
        message: nextcloudResult.message,
      },
    };

    const response = NextResponse.json(responseData, {
      status: success ? 200 : 401,
      // If success is false but maybe we want to return 200 if one of them succeeded?
      // Usually auth endpoint returns 401 if the *main* auth fails.
    });

    // Merge Cookies
    const copyCookies = (sourceRes: Response | undefined) => {
      if (!sourceRes) return;

      let cookies: string[] = [];
      if (
        "getSetCookie" in sourceRes.headers &&
        typeof sourceRes.headers.getSetCookie === "function"
      ) {
        cookies = sourceRes.headers.getSetCookie();
      } else {
        const raw = sourceRes.headers.get("set-cookie");
        if (raw) cookies = [raw];
      }

      cookies.forEach((cookieStr) => {
        response.headers.append("Set-Cookie", cookieStr);
      });
    };

    copyCookies(moodleRes);
    if (forumResult.res) copyCookies(forumResult.res);
    if (nextcloudResult.res) copyCookies(nextcloudResult.res);

    return response;
  } catch (error: unknown) {
    console.error("Login API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống", error: errorMessage },
      { status: 500 }
    );
  }
}
