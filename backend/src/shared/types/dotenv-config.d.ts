// dotenv 18 publica "dotenv/config" solo en el campo "exports" de su package.json, que la
// resolución de módulos de este proyecto (node10) no lee. Los scripts lo importan primero,
// como efecto secundario, para cargar el .env antes que la configuración de Firebase.
declare module "dotenv/config";
