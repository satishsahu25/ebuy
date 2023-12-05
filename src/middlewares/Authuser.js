import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const Authuser = async(req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return false;
  try {
    const extractauthuserinfo =  jwt.verify(token, "default-secret-key");
    console.log(extractauthuserinfo);

    if(extractauthuserinfo) return extractauthuserinfo;

} catch (err) {
    console.log(err);
    return false;
  }
};

export default Authuser;
