const db=require("../../data/db-config");
/**
  tüm kullanıcıları içeren bir DİZİ ye çözümlenir, tüm kullanıcılar { user_id, username } içerir
 */
async function bul() {

  const allUsers=await db("users")
  return allUsers;
}

/**
  verilen filtreye sahip tüm kullanıcıları içeren bir DİZİ ye çözümlenir
 */
function goreBul(username) {

return db("users").where("username", username).first()

}

/**
  verilen user_id li kullanıcıya çözümlenir, kullanıcı { user_id, username } içerir
 */
function idyeGoreBul(user_id) {

return db("users").where("user_id", user_id)

}

/**
  yeni eklenen kullanıcıya çözümlenir { user_id, username }
 */
async function ekle(user) {

  const [user_id]=await db("users").insert(user);
  return idyeGoreBul(user_id)

}

// Diğer modüllerde kullanılabilmesi için fonksiyonları "exports" nesnesine eklemeyi unutmayın.
module.exports={
  bul,
  goreBul,
  idyeGoreBul,
  ekle
}