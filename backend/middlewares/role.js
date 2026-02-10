// middlewares/role.js
module.exports = function (...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    if (!rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ error: "Sem permissões" });
    }

    next();
  };
};
