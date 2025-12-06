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

    const baseUrl = "https://forum.bkt.net.vn";

    // Step 1: Get login page to obtain cookies and requesttoken
    console.log("Step 1: Getting login page...");
    const loginPageResponse = await fetch(`${baseUrl}/login`, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BKT-Auth/1.0)",
      },
    });

    // Extract cookies from login page
    let initialCookies: string[] = [];
    if (
      "getSetCookie" in loginPageResponse.headers &&
      typeof loginPageResponse.headers.getSetCookie === "function"
    ) {
      initialCookies = loginPageResponse.headers.getSetCookie();
    } else {
      const raw = loginPageResponse.headers.get("set-cookie");
      if (raw) initialCookies = [raw];
    }

    console.log("Initial cookies:", initialCookies.length);

    // Parse cookies for next request
    const cookieHeader = initialCookies
      .map((c) => c.split(";")[0])
      .join("; ");

    // Extract requesttoken from HTML (if needed)
    const loginPageHtml = await loginPageResponse.text();
    const requestTokenMatch = loginPageHtml.match(
      /data-requesttoken="([^"]+)"/
    );
    const requestToken = requestTokenMatch ? requestTokenMatch[1] : "";

    console.log("Request token found:", !!requestToken);

    // Step 2: Submit login form
    console.log("Step 2: Submitting login...");
    const formData = new URLSearchParams();
    formData.append("user", username);
    formData.append("password", password);
    if (requestToken) {
      formData.append("requesttoken", requestToken);
    }

    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (compatible; BKT-Auth/1.0)",
        Cookie: cookieHeader,
      },
      body: formData.toString(),
      redirect: "manual", // Don't follow redirects
    });

    console.log("Nextcloud login response status:", response.status);

    // Check if login was successful (302 redirect or 200)
    if (response.status === 302 || response.status === 303 || response.status === 200) {
      console.log("Login successful, extracting cookies...");

      // Collect all cookies from both requests
      let allCookies: string[] = [...initialCookies];
      
      try {
        if (
          "getSetCookie" in response.headers &&
          typeof response.headers.getSetCookie === "function"
        ) {
          allCookies = [...allCookies, ...response.headers.getSetCookie()];
        } else {
          const raw = response.headers.get("set-cookie");
          if (raw) allCookies.push(raw);
        }

        console.log(`Total Nextcloud cookies:`, allCookies.length, "cookies found");

        // Step 3: Verify login by getting user info
        const cookieHeaderFinal = allCookies
          .map((c) => c.split(";")[0])
          .join("; ");

        const authHeader =
          "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
        
        const userInfoResponse = await fetch(
          `${baseUrl}/ocs/v2.php/cloud/user?format=json`,
          {
            method: "GET",
            headers: {
              Authorization: authHeader,
              "OCS-APIRequest": "true",
              Cookie: cookieHeaderFinal,
              "User-Agent": "Mozilla/5.0 (compatible; BKT-Auth/1.0)",
            },
          }
        );

        let userData = {};
        if (userInfoResponse.ok) {
          try {
            const data = await userInfoResponse.json();
            userData = data.ocs?.data || data;
          } catch (e) {
            console.error("Failed to parse user info:", e);
          }
        }

        // Parse cookies into key-value pairs for localStorage
        // Process in reverse order to keep the latest cookies (newer cookies override older ones)
        const cookiesMap: Record<string, string> = {};
        allCookies.reverse().forEach((cookieStr) => {
          const cookieName = cookieStr.split("=")[0];
          const cookieValue = cookieStr.split(";")[0].split("=")[1] || "";
          
          // Skip __Host- cookies and deleted cookies
          if (!cookieName.startsWith("__Host-") && cookieValue !== "deleted") {
            // Only set if not already set (keeping the newest value)
            if (!cookiesMap[cookieName]) {
              cookiesMap[cookieName] = cookieValue;
            }
          }
        });

        const nextResponse = NextResponse.json({
          success: true,
          user: userData,
          message: "Đăng nhập Nextcloud thành công",
          cookies: cookiesMap, // Trả về cookies trong response body
        });

        // Vẫn cố gắng set cookies qua header (sẽ hoạt động trên production)
        const isProduction = req.headers.get("host")?.includes("bkt.net.vn");
        
        allCookies.forEach((cookieStr, index) => {
          try {
            const cookieName = cookieStr.split("=")[0];
            
            if (cookieName.startsWith("__Host-")) {
              console.log(`Skipping cookie ${index}: ${cookieName}`);
              return;
            }

            const parts = cookieStr.split(";").map((part) => part.trim());
            const filteredParts = parts.filter((part) => {
              const lowerPart = part.toLowerCase();
              return (
                !lowerPart.startsWith("domain=") &&
                !lowerPart.startsWith("samesite=") &&
                lowerPart !== "secure"
              );
            });

            if (isProduction) {
              filteredParts.push("Domain=.bkt.net.vn");
              filteredParts.push("SameSite=None");
              filteredParts.push("Secure");
            } else {
              filteredParts.push("SameSite=Lax");
            }
            
            if (!filteredParts.some((p) => p.toLowerCase().startsWith("path="))) {
              filteredParts.push("Path=/");
            }

            const modifiedCookie = filteredParts.join("; ");
            console.log(`Setting Nextcloud cookie ${index}: ${cookieName}`);
            nextResponse.headers.append("Set-Cookie", modifiedCookie);
          } catch (cookieError) {
            console.error(`Error processing cookie ${index}:`, cookieError);
          }
        });

        return nextResponse;
      } catch (innerError) {
        console.error("Error in success handler:", innerError);
        throw innerError;
      }
    }

    // Login failed
    console.log("Login failed with status:", response.status);
    return NextResponse.json(
      {
        success: false,
        message: "Sai tên đăng nhập hoặc mật khẩu",
      },
      { status: 401 }
    );
  } catch (error: unknown) {
    console.error("Nextcloud Login API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống", error: errorMessage },
      { status: 500 }
    );
  }
}
