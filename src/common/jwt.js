const jwt = require("jsonwebtoken");
// jwt
function generateToken(
  apikey = "432b814e216cba24d09b9c52c0a1f196.jf4kvde0vFLhFkSC"
) {
  const [id, secret] = apikey.split(".");
  const payload = {
    api_key: id,
  };
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "365 days",
    header: { alg: "HS256", sign_type: "SIGN" },
  });
  console.log("token:", token);
  return token;
}
generateToken();
