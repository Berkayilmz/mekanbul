var mongoose = require("mongoose");
var dbURI="mongodb+srv://berkay:123456By@mekanbul.ffwgfz1.mongodb.net/mekanbul" //VSREW MONGO!!!!!!!!!!

mongoose.connect(dbURI);
mongoose.connection.on("connected", function () {
  console.log("Mongoose " + dbURI + " adresindeki veritabanına bağlandı\n");
});
//Bağlantı hatası olduğunda konsola hata bilgisini yazdır
mongoose.connection.on("error", function (err) {
  console.log("Mongoose bağlantı hatası\n: " + err);
});
//Bağlantı  kesildiğinde konsola kesilme bilgisini yaz.
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose bağlantısı kesildi\n");
});
// Uygulama kapandığında kapat.
process.on("SIGINT", function () {
  mongoose.connection.close();
  console.log("Bağlantı kapatıldı");
  process.exit(0);
});
require("./venue");
