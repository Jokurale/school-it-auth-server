function ErrorHelper(res, { code, message }) {
  res.status(code).json({ error: message });
  return;
}

module.exports = {
  ErrorHelper,
};
