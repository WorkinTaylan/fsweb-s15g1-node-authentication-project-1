const express = require("express");
const session=require("express-session");
const helmet = require("helmet");
const cors = require("cors");
const SessionStore=require("connect-session-knex")(session)

/**
  Kullanıcı oturumlarını desteklemek için `express-session` paketini kullanın!
  Kullanıcıların gizliliğini ihlal etmemek için, kullanıcılar giriş yapana kadar onlara cookie göndermeyin. 
  'saveUninitialized' öğesini false yaparak bunu sağlayabilirsiniz
  ve `req.session` nesnesini, kullanıcı giriş yapana kadar değiştirmeyin.

  Kimlik doğrulaması yapan kullanıcıların sunucuda kalıcı bir oturumu ve istemci tarafında bir cookiesi olmalıdır,
  Cookienin adı "cikolatacips" olmalıdır.

  Oturum memory'de tutulabilir (Production ortamı için uygun olmaz)
  veya "connect-session-knex" gibi bir oturum deposu kullanabilirsiniz.
 */

const server = express();
const sessionConfig={
  name:"cikolatacips",
  secret:process.env.SESSION_SECRET || "Herhangi bir şey",
  cookie:{
    maxAge:1000*30,
    secure:process.env.SECURE_COOKIE || false
  },
  httpOnly:true,
  resave:false,
  saveUninitialized:false 
};

const authRouter=require("./auth/auth-router");
const usersRouter=require("./users/users-router");

server.use(express.json());
server.use(session(sessionConfig))
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
