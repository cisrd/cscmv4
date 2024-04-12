import { authMiddleware  } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/sign-in']
});


export const config = {
  matcher: [
    "/((?!.+\\.(?:png|jpg|jpeg|gif|svg|css|js)$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};




  // matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],