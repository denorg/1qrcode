import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { qrcode } from "./mod.ts";

Deno.test("should return dataurl string of generated qrcode", async function (): Promise<
  void
> {
  const code =
    "data:image/gif;base64,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nJ75+f/kWg/7gqzkYJ/36c/pmZ//T671sC/ISg72eZ/+nJ75+f/kWg/7gqzkYJ/36c/pmZ//T671sC/ISg72eZ/+nJ75+f/kWg/7gqzkYJ/36c/pmZ//T671sC/ISg72eZ/+nJ75+f/kWg/7gqzkYJ/36c/pmZ//T671sC/ISg72ef+f/pye+fn/5FoP+4Ks5GCf9+nP6Zmf/0+u9bAvyEoO9nmf/pye+fn/5FoP+4Ks2NUL2Mdv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xv6Qhf2dhv5bAvyGde+9xf7gTe/oJt9VT/9xp8Yiz/ddEhn/XUr241j/fd314sddEhn/XUr241j/fd314sddEhn/XUr241j/fd314sddEhn/XUr241j/fd314sddEhn/XUr241j/fd314sddEhn/XUr241j/fd314sddEhn/XUr241j/fd314sddEhn/XUr241j/fd314sddEhn/XUr241j/fd314sddEhn/XUr241j/fd314sddEhn/XUr241j/fd314sddEhn/XUr241j/fd316C3AWTLvnwzv24b+Re7/niDmuTLvnwzv24b+Re7/niDmuTLvnwzv24b+Re7/niDmuTLvnwzv24b+Re7/niDmuTLvnwzv24b+Re7/ni/w5rky758M79uG/kXu/54g5rky758M79uG/kXu/54g5rky758M79uG/kXu/54g5rky758M79uG/kXu/54g5rky758M79uG/kXu/54g5rky758M79uG/kXu/54g5rky758M79uG/kXu/54g5rky758M79uG/kXu/54u7//Rry1V7xWU7pps/hf7/6yE3/PG/k8V3Rup/lsL/6yE3/PG/k8V3Rup/lsL/6yE3/PG/k8V3Rup/lsL/6yE3/PG/k8V3Rup/lsL/6yE3/PG/k8V3Rup/lsL/6yE3/PG/k8V3Rup/lsL/6yE3/PG/k8V3Rup/lsL/6yE3/PG/k8V3Rup/lsP+/+shN/zxv5PFd0bqf5bC/+shN/zxv5PFd0bqf5bC/+shN/zxv5PFd0bqf5bC/+shN/zxv5PFd0bqf5bC/+kVd2YA1+i2PzWf+7Uz+2ug49ZUPvk/e8th85t/O5K+NjlNf+eD75C2PzWf+7Uz+2ug49ZUPvk/e8th85t/O5K+NjlNf+eD75C2PzWf+7Uz+2ug49ZUPvk/e8th85t/O5K+NjlNf+eD75C2PzWf+7Uz+2ug49ZUPvk/e8th85t/O5K+NjlNf+eD75C2PzWf+7Uz+2ug49ZUPvk/e8th85t/O5K+NjlNf+eD75C2PzWf+7Uz+2ug49ZUPvk/e8th85t//zuSvjY5TX/ng++Qtj81n/u1M/tro6OTondD9+v5uz9uvfdMdz+Svff+k3uy67/a8/do33fFM/tr3T+rNrvtuz9uvfdMdz+Svff+k3uy67/a8/do33fFM/tr3T+rNrvtuz9uvfdMdz+Svff+k3uy67/a8/do33fFM/tr3T+rNrvtuz9uvfdMdz+Svff+k3uy67/a8/do33fFM/tr3T+rNrvtuz9uvfdMdz+Svff+k3uy67/a8/do33fFM/tr3T+rNrvtuz9uvfdMdz+Svff+k3uy67/a8/do33fFM/tr3T+rNrvtuz9uvfdMdz+Svff+rT/377//tb/WkPvVj7eTo/w3ncv/fVN/+Vk/qUz/WTo7ecC73/0317W/1pD71Y+3k6A3ncv/fVN/+Vk/qUz/WTo7ecC73/0317W/1pD71Y+3k6A3ncv/fVN/+Vk/qUz/WTo7ecC73/0317W/1pD71Y+3k6A3ncv/fVN/+Vk/qUz/WTo7ecC73/0317W/1pD71Y+3k6A3ncv/fVN/+Vk/qUz/WTo7ecC73/0317W/1pD71Y+3k6A3ncv/fVN/+Vk/qUz/WTo7ecC73/0317W/1pD71Y+3k6M3pz5/su3/hMf72eU/6yx/7Fd3t3c/+oB795U4FTo7enP78yb77Fx7jb5/3pL/8sV/R3d797A/q0f9f7lTg5OjN6c+f7Lt/4TH+9nlP+ssf+xXd7d3P/qAe/eVOBU6O3pz+/Mm++xce42+f96S//LFf0d3e/ewP6tFf7lTg5OjN6c+f7Lt/4TH+9nlP+ssf+xXd7d3P/qAe/eVOBU6O3pz+/Mm++xce42+f96S//LFf0d3e/ewP6tFf7lTg5OjN6c+f7Lt/4TH+9nk/6uvu0r0+71a/+tSvz+5v/gT5vHjv+Zr//L9//6R+0Tz/86+u2O+e+RTf71rP4fQ8+z//6or97plP8f2u9RxOz7P/86+u2O+e+RTf71rP4fQ8+z//6or97plP8f2u9RxOz7P/86+u2O+e+RTf71r/z+H0PPs//+qK/e6ZT/H9rvUcTs+z//OvrtjvnvkU3+9az+H0PPs//+qK/e6ZT/H9rvUcTs+z//OvrtjvnvkU3+9az+H0PPs//+qK/e6ZT/H9rvUcTs+z//OvrtjvnvkU3+9az+H07PD0TuoXHfJZv+b0z+SvXeyYH/xrTv/pvfOczv0TjPqen2+7/uX0n947z+ncP8Go7/n5tutfTv/pvfOczv0TjPqen2+7/uX0n947z+ncP8Go7/n5tutfTv/pvfOczv0TjPqen2+7/uX0n947z+ncP8Go7/n5tutfTv/pvfOczv0TjPqen2+7/uX0n947z+ncP8Go7/n5tutfeU7/6b3znM79E4z6np9vu/7l9J/eO8/p3D/BqO/5+bbrX07/6b3znM79E4z6np9vu/7l9J/eO8/p3D/BqN9t3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3dZt3RYDBQAAOw==";

  assertEquals(
    await qrcode(
      "bitcoin:55162b4f35dc8fe637372ac1?amount=0.55169320&label=Order#18",
    ),
    code,
  );
});
