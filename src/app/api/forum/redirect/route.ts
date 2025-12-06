import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get cookies from query params (sent from client)
    const cookiesParam = req.nextUrl.searchParams.get("cookies");
    
    if (!cookiesParam) {
      return NextResponse.redirect("https://forum.bkt.net.vn/login");
    }

    const cookies = JSON.parse(decodeURIComponent(cookiesParam));
    
    // Create redirect response to forum
    const response = NextResponse.redirect("https://forum.bkt.net.vn/");
    
    // Set all cookies for forum domain
    Object.entries(cookies).forEach(([name, value]) => {
      if (typeof value === "string" && value !== "deleted") {
        const cookieStr = [
          `${name}=${value}`,
          "Domain=.bkt.net.vn",
          "Path=/",
          "SameSite=None",
          "Secure",
        ].join("; ");
        
        response.headers.append("Set-Cookie", cookieStr);
      }
    });

    return response;
  } catch (error) {
    console.error("Forum redirect error:", error);
    return NextResponse.redirect("https://forum.bkt.net.vn/login");
  }
}
