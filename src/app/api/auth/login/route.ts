import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

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

    // 2. Call Nextcloud Login API
    const nextcloudLoginPromise = (async () => {
      try {
        const baseUrl = "https://forum.bkt.net.vn/";
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
        console.log("Nextcloud response status:", response.status);
        console.log("Nextcloud response:", responseText.substring(0, 200));

        if (response.status === 200 || response.status === 207) {
          let userData = {};
          try {
            const data = JSON.parse(responseText);
            userData = data.ocs?.data || data;
          } catch (e) {
            console.error("Failed to parse Nextcloud response:", e);
            userData = { authenticated: true };
          }
          return {
            success: true,
            user: userData,
            res: response,
          };
        }

        // Check if it's an authentication error
        if (response.status === 401) {
          return {
            success: false,
            status: response.status,
            message: "Nextcloud authentication failed - invalid credentials",
          };
        }

        return {
          success: false,
          status: response.status,
          message: `Nextcloud error: ${responseText.substring(0, 100)}`,
        };
      } catch (error) {
        console.error("Nextcloud login error:", error);
        return { success: false, error };
      }
    })();

    // 3. Forum Login - Skipped (endpoint not accessible)
    const forumLoginPromise = Promise.resolve({
      success: false,
      message: "Forum login skipped - endpoint not found",
      status: 404,
    });

    // Wait for all three
    const [moodleRes, nextcloudResWrapper, forumResWrapper] = await Promise.all([
      moodleLoginPromise,
      nextcloudLoginPromise,
      forumLoginPromise,
    ]);

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

    const nextcloudResult = nextcloudResWrapper as ResultType;
    const forumResult = forumResWrapper as ResultType;

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
      nextcloud: {
        success: nextcloudResult.success,
        user: nextcloudResult.user,
        message: nextcloudResult.message,
      },
      forum: {
        success: forumResult.success,
        status: forumResult.status,
        message: forumResult.message,
      },
    };

    const response = NextResponse.json(responseData, {
      status: success ? 200 : 401,
      // If success is false but maybe we want to return 200 if one of them succeeded?
      // Usually auth endpoint returns 401 if the *main* auth fails.
    });

    // Merge Cookies from backend services
    const copyCookies = (sourceRes: Response | undefined, serviceName: string) => {
      if (!sourceRes) {
        console.log(`No response from ${serviceName} to copy cookies`);
        return;
      }

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

      console.log(`Cookies from ${serviceName}:`, cookies.length, "cookies found");

      cookies.forEach((cookieStr, index) => {
        // Skip cookies with __Host- prefix (they have strict requirements)
        const cookieName = cookieStr.split("=")[0];
        if (cookieName.startsWith("__Host-")) {
          console.log(`Skipping ${serviceName} cookie ${index}: ${cookieName} (has __Host- prefix)`);
          return;
        }

        // Parse cookie to modify domain
        const parts = cookieStr.split(";").map((part) => part.trim());
        const filteredParts = parts.filter((part) => {
          const lowerPart = part.toLowerCase();
          // Remove existing domain restrictions and SameSite for cross-domain
          return !lowerPart.startsWith("domain=") && 
                 !lowerPart.startsWith("samesite=");
        });
        
        // Add domain=.bkt.net.vn and SameSite=None for cross-domain
        filteredParts.push("Domain=.bkt.net.vn");
        filteredParts.push("SameSite=None");
        
        // Ensure Secure flag is present (required for SameSite=None)
        if (!filteredParts.some(p => p.toLowerCase() === "secure")) {
          filteredParts.push("Secure");
        }
        
        const modifiedCookie = filteredParts.join("; ");

        console.log(`Setting ${serviceName} cookie ${index}: ${cookieName}`);
        response.headers.append("Set-Cookie", modifiedCookie);
      });
    };

    copyCookies(moodleRes, "Moodle");
    if (nextcloudResult.res) copyCookies(nextcloudResult.res, "Nextcloud");
    if (forumResult.res) copyCookies(forumResult.res, "Forum");

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
