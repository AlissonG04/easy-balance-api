module.exports = function adminOnly(req, res, next) {
  const usuario = req.session?.usuario;

  if (!usuario || usuario.tipo !== "admin") {
    return res.status(403).json({ message: "Acesso não autorizado" });
  }

  next();
};
