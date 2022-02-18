canvas = document.getElementById("canvas"); //oyun ortamı olan canvas id ile alınıyor.

const ctx = canvas.getContext("2d"); //canvas içeriği 2d olarak alınıyor.
var BB = canvas.getBoundingClientRect(); //canvas çevresi boşluğu alıyoruz
var offsetX = BB.left; //canvas çevresindeki x ve y kordinatındaki boşluklar alınıyor. tıklama yapılırken nereye denk geldiğini bunlarsız bulamayız
var offsetY = BB.top;
started = false; //oyun başladı mı başlamadı mı burda kontrol ediyoruz varsayılan false
correct = 0; //doğru bilinen sayısı ilk başta 0

objects = [
  //objects arrayı. burada 40 obje için 40 array var. sadece 1 tanesini anlatacağım gerisi aynı çünkü
  //bunlar ekrandaki objeler olacak. bilgileri burada saklı.
  //image: resim konumu,sound:objenin ses konumu, x:objenin x kordinatı, y:objenin y kordinatı,
  //stopregion: objenin ait olduğu rengin diktörtgenini belirliyor. yani obje bu kordinatlar içerisine girdiği zaman doğru bilinmiş sayılacak.
  //          bu farklı renkler için farklı kordinatlarda.
  //stoped: obje şuan oynanabilir mi yoksa bilinip tamamlandı mı onu takip ediyor.
  //Bu objelerdeki x y kordinatlarıyla oynayarak konumlarını değiştirebilirsiniz.
  {
    image: "images/red1.png",
    sound: "sounds/rose.mp3",
    x: 50,
    y: 50,
    stopregion: { x: 10, y: 500, endx: 10 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/red2.png",
    sound: "sounds/barn.mp3",
    x: 150,
    y: 30,
    stopregion: { x: 10, y: 500, endx: 10 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/red3.png",
    sound: "sounds/firetruck.mp3",
    x: 250,
    y: 50,
    stopregion: { x: 10, y: 500, endx: 10 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/red4.png",
    sound: "sounds/cherries.mp3",
    x: 380,
    y: 60,
    stopregion: { x: 10, y: 500, endx: 10 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/red5.png",
    sound: "sounds/stopsign.mp3",
    x: 450,
    y: 50,
    stopregion: { x: 10, y: 500, endx: 10 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/red6.png",
    sound: "sounds/strawberries.mp3",
    x: 550,
    y: 50,
    stopregion: { x: 10, y: 500, endx: 10 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/red7.png",
    sound: "sounds/heart.mp3",
    x: 650,
    y: 50,
    stopregion: { x: 10, y: 500, endx: 10 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/red8.png",
    sound: "sounds/ladybug.mp3",
    x: 750,
    y: 50,
    stopregion: { x: 10, y: 500, endx: 10 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/red9.png",
    sound: "sounds/tomatoes.mp3",
    x: 850,
    y: 50,
    stopregion: { x: 10, y: 500, endx: 10 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/red10.png",
    sound: "sounds/cardinal.mp3",
    x: 920,
    y: 50,
    stopregion: { x: 10, y: 500, endx: 10 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/blue1.png",
    sound: "sounds/mailbox.mp3",
    x: 20,
    y: 100,
    stopregion: { x: 810, y: 500, endx: 810 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/blue2.png",
    sound: "sounds/blueberries.mp3",
    x: 150,
    y: 100,
    stopregion: { x: 810, y: 500, endx: 810 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/blue3.png",
    sound: "sounds/shark.mp3",
    x: 400,
    y: 250,
    stopregion: { x: 810, y: 500, endx: 810 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/blue4.png",
    sound: "sounds/bluejay.mp3",
    x: 320,
    y: 100,
    stopregion: { x: 810, y: 500, endx: 810 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/blue5.png",
    sound: "sounds/bluewhale.mp3",
    x: 450,
    y: 100,
    stopregion: { x: 810, y: 500, endx: 810 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/blue6.png",
    sound: "sounds/flower.mp3",
    x: 600,
    y: 150,
    stopregion: { x: 810, y: 500, endx: 810 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/orange1.png",
    sound: "sounds/tiger.mp3",
    x: 650,
    y: 100,
    stopregion: { x: 210, y: 500, endx: 210 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/orange2.png",
    sound: "sounds/fire.mp3",
    x: 750,
    y: 80,
    stopregion: { x: 210, y: 500, endx: 210 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/orange3.png",
    sound: "sounds/autumnleaves.mp3",
    x: 900,
    y: 150,
    stopregion: { x: 210, y: 500, endx: 210 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/orange4.png",
    sound: "sounds/lantern.mp3",
    x: 80,
    y: 140,
    stopregion: { x: 210, y: 500, endx: 210 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/orange5.png",
    sound: "sounds/cone.mp3",
    x: 150,
    y: 150,
    stopregion: { x: 210, y: 500, endx: 210 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/orange6.png",
    sound: "sounds/cat.mp3",
    x: 250,
    y: 100,
    stopregion: { x: 210, y: 500, endx: 210 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/orange7.png",
    sound: "sounds/butterfly.mp3",
    x: 350,
    y: 150,
    stopregion: { x: 210, y: 500, endx: 210 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/orange8.png",
    sound: "sounds/oranges.mp3",
    x: 450,
    y: 150,
    stopregion: { x: 210, y: 500, endx: 210 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/yellow1.png",
    sound: "sounds/sunflower.mp3",
    x: 550,
    y: 150,
    stopregion: { x: 410, y: 500, endx: 410 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/yellow2.png",
    sound: "sounds/sun.mp3",
    x: 700,
    y: 250,
    stopregion: { x: 410, y: 500, endx: 410 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/yellow3.png",
    sound: "sounds/lemon.mp3",
    x: 750,
    y: 150,
    stopregion: { x: 410, y: 500, endx: 410 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/yellow4.png",
    sound: "sounds/lemonade.mp3",
    x: 850,
    y: 150,
    stopregion: { x: 410, y: 500, endx: 410 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/yellow5.png",
    sound: "sounds/banana.mp3",
    x: 30,
    y: 200,
    stopregion: { x: 410, y: 500, endx: 410 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/yellow6.png",
    sound: "sounds/chick.mp3",
    x: 150,
    y: 200,
    stopregion: { x: 410, y: 500, endx: 410 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/yellow7.png",
    sound: "sounds/duck.mp3",
    x: 250,
    y: 200,
    stopregion: { x: 410, y: 500, endx: 410 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/green1.png",
    sound: "sounds/lilypad.mp3",
    x: 350,
    y: 220,
    stopregion: { x: 610, y: 500, endx: 610 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/green2.png",
    sound: "sounds/worm.mp3",
    x: 450,
    y: 220,
    stopregion: { x: 610, y: 500, endx: 610 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/green3.png",
    sound: "sounds/apple.mp3",
    x: 550,
    y: 230,
    stopregion: { x: 610, y: 500, endx: 610 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/green4.png",
    sound: "sounds/beans.mp3",
    x: 650,
    y: 240,
    stopregion: { x: 610, y: 500, endx: 610 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/green5.png",
    sound: "sounds/pearl.mp3",
    x: 750,
    y: 200,
    stopregion: { x: 610, y: 500, endx: 610 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/green6.png",
    sound: "sounds/pinetree.mp3",
    x: 800,
    y: 200,
    stopregion: { x: 610, y: 500, endx: 610 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/green7.png",
    sound: "sounds/frog.mp3",
    x: 900,
    y: 240,
    stopregion: { x: 610, y: 500, endx: 610 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/green8.png",
    sound: "sounds/turtle.mp3",
    x: 50,
    y: 250,
    stopregion: { x: 610, y: 500, endx: 610 + 200, endy: 500 + 300 },
    stopped: false,
  },
  {
    image: "images/green9.png",
    sound: "sounds/grass.mp3",
    x: 150,
    y: 250,
    stopregion: { x: 610, y: 500, endx: 610 + 200, endy: 500 + 300 },
    stopped: false,
  },
];

var movingobjectindex; //hareket eden cismin yukarıdaki indexini takip etmek için değişken

function gameStart() {
  //oyun başlangıcını belirttiğim en başta çalışan fonksiyon.
  splash = new Image(); //başlangıç ekranı resmi çizliyor.
  splash.src = "images/splash.png";
  splash.onload = function () {
    ctx.drawImage(splash, 200, 150); //resim yüklendği anda canvas üzerinde ortaya çiziyoruz. bu arada resim nasıl canvasa ekleniyor onu gördük.
    //resim dosyası,x ve y kordinatları veriyoruz.
  };
}

//sürekli canvastaki objeleri baştan çizecek olan fonksiyon. bu fonksiyon loop ediliyor ve saniyede 60 kez ekran çiziliyor.
function draw() {
  flat = new Image(); //ilk olarak beyaz arkaplan tüm ekranı kaplıyor ve ekran sıfırlanmış oluyor
  flat.src = "images/flat.png";
  flat.onload = function () {
    ctx.drawImage(flat, 0, 0);
  };
  redbox = new Image(); //daha sonra renklerin kutuları aşağıya çizliyor.
  redbox.src = "images/redbox.png";
  redbox.onload = function () {
    ctx.drawImage(redbox, 10, 500); //kırmızı kutu çiziliyor
  };
  orangebox = new Image();
  orangebox.src = "images/orangebox.png";
  orangebox.onload = function () {
    ctx.drawImage(orangebox, 210, 500); //turuncu kutu çiziliyor
  };
  yellowbox = new Image();
  yellowbox.src = "images/yellowbox.png";
  yellowbox.onload = function () {
    ctx.drawImage(yellowbox, 410, 500); //sarı kutu çiziliyor
  };
  greenbox = new Image();
  greenbox.src = "images/greenbox.png";
  greenbox.onload = function () {
    ctx.drawImage(greenbox, 610, 500); //yeşil kutu çiziliyor
  };
  bluebox = new Image();
  bluebox.src = "images/bluebox.png";
  bluebox.onload = function () {
    ctx.drawImage(bluebox, 810, 500); //mavi kutu çiziliyor
  };
  for (var i = 0; i < objects.length; i++) {
    //her obje tek tek ziyaret edilerek x ve y konumları alınıyor. ekrana çizilioyr.
    img = new Image();
    img.src = objects[i].image;

    img.xx = objects[i].x;
    img.yy = objects[i].y;
    img.onload = function () {
      ctx.drawImage(this, this.xx, this.yy);
    };
    objects[i].width = img.width;
    objects[i].height = img.height; //resimlerin boyut bilgieri objeleri içierisinde saklanıyor.
  }
  requestAnimationFrame(draw); //bu fonksiyon ile draw fonksiynu tekrar çağırılıyor. requestAnimationFrame javascriptin kendi içinde bulunan bir fonksiyondur ve saniyede 59-60 kadar aynı fonksiynu çalıştırmaya yarar. Yani bu 60hz demek.
}

function moving(event) {
  //bu event listenerlar aşağıda açılıyor önce begin fonksiynunu okuyun.
  //mouse butonu kaldırılmadan hareket ettirildiği sürece tıklanan objenin x ve y si mouse x ve y sine eşitleniyor.
  //yani mouse butonu kaldırılına dek sürüklenecek.
  objects[movingobjectindex].x =
    event.clientX - offsetX - objects[movingobjectindex].width / 2;
  objects[movingobjectindex].y =
    event.clientY - offsetY - objects[movingobjectindex].height / 2;
}
function mouseup() {
  //mouse butonu kaldırılıdığnda olacak olaylar
  canvas.removeEventListener("mousemove", moving); //mouse üzerindeki hareket listenerları kaldırıylıor.
  canvas.removeEventListener("mouseup", mouseup);
  if (objects[movingobjectindex].y > 500) {
    //eğer hareket ettirilen obje ekranın aşağısında kalıyor ise
    //ve hareket ettirilen obje kendi renginin içerisinde bırakıldıysa
    if (
      objects[movingobjectindex].x > objects[movingobjectindex].stopregion.x &&
      objects[movingobjectindex].x < objects[movingobjectindex].stopregion.endx
    ) {
      objects[movingobjectindex].stopped = true; //obje tamamen sabitleniyor
      correct += 1; //doğru sayısı bir artırılıyor
      if (correct == 40) {
        //eğer doğru sayısı 40 oldu ise oyun bitecek
        var audio = new Audio("sounds/win.wav"); //kazanma sesi veriliyor
        audio.play();
        
        win = new Image();
        win.src = "images/win.png"; //kazanma resmi çizlioyr.
        win.onload = function () {
          ctx.drawImage(win, 300, 150);
        };
      } else {
        //henüz 40 olmadıysa sadece doğru ses efekti oynanıyor.
        var audio = new Audio("sounds/correct.wav");
        audio.play();
      }
    } else {
      //eğer cisim ekranın alt kısmında ama kendi renginde değil ise
      objects[movingobjectindex].y = 400; //obje kutuların dışına atılıyor
      var audio = new Audio("sounds/incorrect.mp3"); //yanlış ses efekti oynanıyor.
      audio.play();
    }
  }
}
function begin() {
  //canvasa tıklanma fonksiyonu htmlden direkt geliyor.
  if (!started) {
    //eğer oyun başlamadıysa
    started = true; //oyun başladı durumu veriliyor.
    var audio = new Audio("sounds/info.mp3"); //bilgi sesi oynatılıyor.
    audio.play();
    canvas.style.cursor = "default"; //canvas üzerindeki cursor stili değiştiriliyor. ilk başta poıinterken şuan normal cursor.
    ctx.fillStyle = "white"; //ekran temizleniyor. white rengi seçilip
    ctx.fillRect(0, 0, canvas.width, canvas.height); //canvas boyu beyaz diktörtgen çizliiyor.
    draw(); //draw fonksiynu çağırılıyor. artık draw fonksyinu kendi kendini çalıştırarak saniyede 60 kez çalışacak.
    canvas.addEventListener("mousedown", function (event) {
      //canvas üzerine tıklama eventi açıyoruz. sürükle bırak için.
      for (var i = 0; i < objects.length; i++) {
        //her obje for loop ile içinden geçiliyor.
        if (
          event.clientX - offsetX > objects[i].x &&
          event.clientX - offsetX < objects[i].x + objects[i].width
        ) {
          //bu noktada mouse herhangi bir objenin üzerinde ikenmi tıklandı onu test ediyoruz
          //offsetx leri kullanmamızın sebebi, event.clientXden gelen mouse pozisyonu komple html ekranındaki pozisyon. canvasın çevresindeki fazlalığı çıkardığımız zaman mousun canvasa göre pozisyonunu elde ediyoruz.
          //ve mouse bir objenin x,y uzunluk boy bilgileri arasında kalıyor ise objeye tıklanmış anlamına geliyor.
          if (
            event.clientY - offsetY > objects[i].y &&
            event.clientY - offsetY < objects[i].y + objects[i].height
          ) {
            if (objects[i].stopped == false) {
              //eğer tıklanan obje tamamlanmadıysa
              var audio = new Audio(objects[i].sound); //objenin ismini içeren ses dosyası çalıyor.
              audio.play();
              movingobjectindex = i; //hareket eden obje değişkenine bu objenin arraydaki sırasını veriyoruz.
              //daha sonra canvasa mousun hareketi ve mouse butonunun kaldırılması için listener açıyoruz
              // mouse butonu kaldırılmadan mouse hareket ettiği sürece obje sürükleniyor demektir.
              canvas.addEventListener("mousemove", moving); //moving ve mouseup fonksiyonları yukarıda
              canvas.addEventListener("mouseup", mouseup);
            }
          }
        }
      }
    });
  }
}

gameStart(); //gameStart çağırılıyor.
