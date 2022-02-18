var config = {//Phaser için ayar objesi oluşturuyoruz phaser bunu ve içindekileri otomatik algılıyor.
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width:800,//Oyunun boyutlarını veriyoruz
    height:600,
    backgroundColor:"#ffe197",//sahne arkaplan rengi
    scene: {/*Phaser içerisinde 3 ayrı ana fonksiyon var:
        preload oyun dosyalarının yüklendiği fonksiyon en başta çalışır
        create oyun ilk açıldığında bir kere çalışan fonksiyon
        update ise oyun boyunca sürekli loop edilen fonksiyondur.
        aşağıda bu fonksiyonların isimlerini veriyoruz.
      */
        preload: preload,
        create: create,
        update:update
    }
};

//Burada oyunla ilgili değişkenleri açıyoruz
var gamestage=0;//oyun aşaması, bu değişkeni oyuna durumları bildirmek ve ona göre işlem yaptırmak için açtım mesela 0 ise ana menüdeyiz 1 ise geçiş 2 ise oyunu oynuyoruz demek;3 ara animasyon ;4 cevap seçme aşaması ;5 round sonu;6 oyun sonu
var level=0;//oyunda 5 level var bu da levelleri takip etmemizi sağlıyor. aynı zamanda pastaların ve bölüm bilgisininde takibini bu numarayla yapıyoruz
var style = { font: "32px Arial", fill: "#000000", wordWrap: true, align: "center" };//yazılar için font belirliyoruz
var cakes=["cake4","cake3","cake2","cake1"];//pasta türleri için bir array açtım. Bu arraydan oyun başında rasgele pastalar seçeceğiz.
var currentcandles=[];//Oyun içerisindeki roundlarda oluşturacağımız ve sayacağımız mum objelerini bu arrayda saklıyacağız.
var candles=[Math.floor(Math.random()*7)+1,Math.floor(Math.random()*7)+1,Math.floor(Math.random()*7)+1,Math.floor(Math.random()*7)+1,Math.floor(Math.random()*7)+1]//Her bölümde kaç mum karşımıza çıkacağı bu arrayda belirleniyor. Rasgele sayı algoritması ile 1-7 arası sayılar üretiyoruz.
var game = new Phaser.Game(config);//Phaser oyun objesini açıyoruz
var scene;//Oyun içi sahne objesini daha sonra saklamak veulaşmak için global bir değişken.

//başta bahsettiğim dosyaları yükleme fonksiyonu. klasörler içindeki her resimi burada yüklüyoruz ve bir anahtar kelime veriyoruz
function preload ()
{
  this.load.image('upbanner', 'images/birthday.png');
  this.load.image('welldone', 'images/welldone.png');
  this.load.image('playagain', 'images/playagain.png');//Mesela tekrar oynama dosyasına 'playagain' ismini vermişim.
  this.load.image('background', 'images/background.png');
  this.load.image('introcake', 'images/introcake.png');
  this.load.image('candle', 'images/candle.png');
  this.load.image('fire', 'images/fire.png');
  this.load.image('level1', 'images/level1.png');
  this.load.image('level2', 'images/level2.png');
  this.load.image('level3', 'images/level3.png');
  this.load.image('level4', 'images/level4.png');
  this.load.image('level5', 'images/level5.png');
  this.load.image('cake1', 'images/cake1.png');
  this.load.image('cake2', 'images/cake2.png');
  this.load.image('cake3', 'images/cake3.png');
  this.load.image('cake4', 'images/cake4.png');
  this.load.image('baloon1', 'images/baloon1.png');
  this.load.image('baloon3', 'images/baloon3.png');
  this.load.image('baloon2', 'images/baloon4.png');
    this.load.image('introbaloon2', 'images/baloon2.png');

}

//Oyun ilk açıldığında bir kere çalışacak olan fonksiyon. daha çok kurulum vs. yapmak için kullanılıyor.
function create ()
{
//azönceki global sahne değişkenini atıyorum.
  scene=this;
  background=this.add.sprite(400,-500,"background");//arkaplan resmini ekran dışında yaratıyorum.
  sprwelldone=this.add.sprite(400,-500,"welldone");//oyun sonu well done yazısını ekran dışında yaratıyorum
  playagain=this.add.sprite(400,900,"playagain").setInteractive();//tekrar oynama butonunu ekran dışında yaratıyorum burada dikkat setInteractive methodunu kullanarak bu sprite ile etkileşime geçileceğini phasera söylüyoruz.
  playagain.on('pointerover', function (pointer) {//tekrar oyna butonu için eventler açıyoruz, pointerover eventi mouseın üzerine gelmesi
      this.setTint(0x7878ff);//mouse üzerine geldiğinde tekrar oyna butonu biraz kararacak
  });
  playagain.on('pointerout', function (pointer) {//mouse üzerinde değilse eventi
      this.clearTint();//mouse üzerinde değilse kararma kalkacak
  });
  playagain.on('pointerdown', function (pointer) {
    window.location.href=window.location;//tekrar oynaya basılırsa sayfa yenilenecek.
  });

  level1=this.add.sprite(400,-100,"level1");//level göstergeerini burada ekran dışı üst üste yaratıyorum.
  level2=this.add.sprite(400,-100,"level2");
  level3=this.add.sprite(400,-100,"level3");
  level4=this.add.sprite(400,-100,"level4");
  level5=this.add.sprite(400,-100,"level5");
  objlevels=[level1,level2,level3,level4,level5]//ve hepsini objlevels arrayına sırasıyla ekliyorum. daha sonra level değişkeniyle bunlara index ile erişeceğiz.
  cake1=this.add.sprite(1000,400,cakes[Math.floor(Math.random()*4)]);//rasgele pasta resimlerini cakes arrayından seçtirip değişkenlere atıyorum
  cake2=this.add.sprite(1000,400,cakes[Math.floor(Math.random()*4)]);
  cake3=this.add.sprite(1000,400,cakes[Math.floor(Math.random()*4)]);
  cake4=this.add.sprite(1000,400,cakes[Math.floor(Math.random()*4)]);
  cake5=this.add.sprite(1500,400,cakes[Math.floor(Math.random()*4)]);
  objcakes=[cake1,cake2,cake3,cake4,cake5];//aynı şekilde objcakes arrayına ekliyorum.
  baloon1=this.add.sprite(500,900,"baloon1").setInteractive();//cevap balonlarını ekran dışı yaratıyorum.
  baloon2=this.add.sprite(600,900,"baloon2").setInteractive();
  baloon3=this.add.sprite(700,900,"baloon3").setInteractive();
    upbanner = this.add.sprite(400, -100, 'upbanner');//ana menüdeki grafikleri ekran dışı yaratıyorum bu üstten gelen banner
    introcake=this.add.sprite(400,350,"introcake");//bu ana menüdeki pasta
    introbaloon1=this.add.sprite(100,900,"baloon1");//ana menüdeki sol blaon
    introbaloon2=this.add.sprite(700,900,"introbaloon2").setInteractive();//ana menüdeki oyna butonu olan balon. setInteractive methoduyla etkileşime açtık.
    introbaloon2.on('pointerdown', function (pointer) {//Oyna butonu için tıklanınca kararma eventi
        this.setTint(0xbf7fbf);
    });
    introbaloon2.on('pointerup', function (pointer) {//oyna butonuna tıklanınca
        this.clearTint();
        gamestage=1;//oyun durumu 1 olacak,
        var intro= new Audio('sounds/intro.mp3');//intro sesi oynayacak.
        intro.play();
    });


}

//sürekli loopda olan fonksiyonumuz. Burada oyunun bulunduğu durumları if ile sorgulayarak sürekli işlemler yaptırıyoruz.
function update()
{
  if (gamestage==0) {//eğer gamestage 0 ise yani ana menüde isek.
    if(upbanner.y<157/2){//ana menüdeki resimleri sağdan soldan bulunmaları gereken noktalara yavaşca gelecekler.
      upbanner.y+=3;
    }
    if (introbaloon1.y>300) {
      introbaloon1.y-=5;//mesela ana menü sol balonunun y kordinatı 300 olana kadar aşağıdan yukarı y sini azaltıyoruz. y 300 olunca duruyor.
    }
    if (introbaloon2.y>350) {//tamamen aynı mantık.
      introbaloon2.y-=5;
    }
  }
  //oyuna başla butonuna basıldığında bu if içindekiler çalışacak
  if (gamestage==1) {
    upbanner.y-=5;//ana menü resimleri ekran dışına kaydırılacak. farklı hızlarda.
    introbaloon1.y-=10;
    introbaloon2.y-=12;
    introcake.x-=8;
    if (upbanner.y<-200 && introbaloon1.y<-200 && introbaloon2.y<-200 && introcake.x<-300 ) {//eğer bütün ana menü resimleri ekran dışında ise
      gamestage=-1;//gamestage -1 yapılarak bir alttaki ife geçilecek
      var info= new Audio('sounds/info.mp3');//oyunu anlatan ses kaydı oynatılacak
      info.play();
    }
  }

  if (gamestage==-1) {//arkaplan görüntümüz yukarıdan aşağıya iniyor.
    background.y+=10;
    if (background.y==220) {
      gamestage=2;//gereken kordinata inince gamestage 2 olarak bir alltaki ife geçiliyor.
    }
  }
  if (gamestage==2) {//gamestage 2 asıl oyunun sürekli döndüğü kısım.
    if (objcakes[level].x!=250 || objlevels[level].y!=50) {//ilgili levelin pasta objesi sağ taraftan ortaya doğru kaydırılıyor.
      if (objcakes[level].x!=250) {
          objcakes[level].x-=10;
      }
      if (objlevels[level].y!=50) {
          objlevels[level].y+=10;//yukarıdan iligli level göstergesi indiriliyor. buralarda index olarak level kullanıyoruz ki tekrar tekrar aynı şeyleri yazmadan hangi objedeyiz takip edebilelim.
      }
    }
    else {//pastamız ortaya geldikten sonra
      gamestage=3;//gamestage 3 yapılıyor ki 2 bir daha dönmesin. yani bu else bu round sadece 1 kere çalışacak.
      baloons=[baloon1,baloon2,baloon3];//create de açtığımız cevap balonlarını bir arraya koyuyoruz.
      for (var i = 0; i < baloons.length; i++) {//for loop açarak her balona click eventi açıyoruz.
        baloons[i].on("pointerdown",function(){
          if (this.answer==candles[level]) {//balon objemize birazdan cevaplarımızı atayacağız. burada eğer tıklandığında bu balonun cevabı bölümün cevabına eşitse bölümü geçtiriyoruz.
            var pop=new Audio("sounds/pop.mp3");
            pop.play();//doğru cevap ise ilgili sesler oynatılıp gamestage 5 yapılıyor. yani round sonu stagei.
            var correct=new Audio("sounds/correct.wav");
            correct.play();
            gamestage=5;
          }
          else {//yanlış cevapsa balon yukarı gönderiliyor ve yanlış sesi oynatılıyor.
            var incorrect=new Audio("sounds/incorrect.mp3");
            incorrect.play();
            this.y-=15;
          }
        });
      }

      answerbaloon=baloons[Math.floor(Math.random()*3)]//cevap balonu isimli bir değişkene azönceki arraydan rasgele bir balon seçiyoruz.
      answerbaloon.answer=candles[level];//bu balonun cevap değişkenine bölümün cevabını atıyoruz.
      baloons.splice(baloons.indexOf(answerbaloon),1);//arraydan bu balonu çıkarıyoruz çünkü geri kalan 2 balona rasgele cevaplar yükleyeceğiz.
      baloons[0].answer=Math.floor(Math.random()*8)+1;//1den 8e rasgele cevap veriyoruz
      if (baloons[0].answer==answerbaloon.answer) {//eğer asıl cevabımızla aynı bir sayı denk gelirse 1 artırıyoruz
        baloons[0].answer+=1;
      }
      baloons[1].answer=Math.floor(Math.random()*8)+1;//öteki balonumnuz içinde aynı işlemleri yapıyoruz.
      if (baloons[1].answer==answerbaloon.answer || baloons[1].answer==baloons[0].answer) {
        baloons[1].answer+=2;
      }

      //balonların üzerindeki yazılar için answer1,answer2,answer3 diye text objeleri açıyruz.
      answer1=this.add.text(0,50,String(baloons[0].answer),style);//pozisyonları önemli değil ama balonlardaki cevapalrı text olarak vermemiz önemli. ve baştaki style fontumuzu veriyoruz.
      answer1.x=baloons[0].x-10;//kordinatlarını kendi balonlarıyla eşliyoruz.
      answer1.y=baloons[0].y-70;
      answer2=this.add.text(0,0,String(baloons[1].answer),style);//diğer ikisi içinde aynı şekilde.
      answer2.x=baloons[1].x-10;
      answer2.y=baloons[1].y-70;
      answer3=this.add.text(0,100,String(answerbaloon.answer),style);//burada cevap balonumuz söz konusu ona dikkat.
      answer3.x=answerbaloon.x-10;
      answer3.y=answerbaloon.y-70;

      for (var i = 0; i < candles[level]; i++) {//bölümün cevabı kadar mum oluşturmak için for loop açıyoruz
        //candle değişkenine yeni mum resmi atıyoruz. x ve y kordinatlarını bulundukları pastadan alıyorlar ve üzerinde oluyorlar. aralarındaki boşluk için  mum sayısı ve sırasını baz alarak araya boşluklar verdim. bu şekilde yan yana duruyorlar.
        candle=this.add.sprite(objcakes[level].x-(candles[level]*12)+(i*30),objcakes[level].y+Math.floor(Math.random()*20)-objcakes[level].height/2,"candle").setInteractive();
        candle.lit=false;//mum objelerine yanıp yanmadıklarını bilmek için değişken verdim. varsayılan false yani hayır.
        currentcandles.push(candle);//bu rounddaki mumları currentcandles da saklıyoruz.
        candle.on('pointerover', function (pointer) {//mumların üzerine mouse gelirse kararacak
            this.setTint(0x7878ff);
        });
        candle.on('pointerout', function (pointer) {//mouse gelmediyse kararmayacak
            this.clearTint();
        });

        candle.on('pointerdown', function (pointer) {//mumlara tıklama eventi bu
          if (this.lit==false) {//eğer mum zaten yanmıyorsa
            this.lit=true;//yanmış olarak işaretliyoruz.
            this.fire=scene.add.sprite(this.x,this.y-this.height/2,"fire");//mumun üzerine ateş resmi getiriyoruz.
            counter=0;//sayaç açıyoruz
            for (var i = 0; i < currentcandles.length; i++) {//bu rounddaki mumları tek tek ziyaret ederk yanıp yanmadıklarını kontrol ediyoruz
              if (currentcandles[i].lit==true) {//yanan mumlar var ise counter 1 artıyoru
                counter++;
              }
            }
            //en son yanan toplam mum sayısını stringe çevirerek ilgili ses dosyasını oynatıyoruz
            var number= new Audio('sounds/'+String(counter)+'.mp3');
            number.play();
            if (counter==candles[level]) {//eğer tüm mumlar yandıysa 4üncü gamestage geçiliyor
              gamestage=4;
            }
          }
        });

      }
    }
  }
  //Tüm mumlar yandysa olacak olan durum. sadece cevap balonları alttan yukarı geliyor.
  if (gamestage==4) {
    if (answerbaloon.y!=200 ) {
      answerbaloon.y-=10;
      answer3.y-=10//cevap yazıları da onlarla birlikte geliyor.
    }
    if (baloons[0].y!=220) {
      baloons[0].y-=10;
      answer1.y-=10

    }
    if (baloons[1].y!=180) {
      baloons[1].y-=10;
      answer2.y-=10

    }

  }
  //round sonu durumu. doğru cevap geldiğinde gamestage 5 yapılıyor.
  if (gamestage==5) {
    if (objcakes[level].x>-500 || objlevels[level].y>-100) {//son rounddaki pasta ve gösterge sahne dışına kayıyor.
      if (objcakes[level].x>-500) {
        objcakes[level].x-=10;
        for (var i = 0; i < currentcandles.length; i++) {
          currentcandles[i].x-=10;
          currentcandles[i].fire.x-=10;
        }
      }
      if (objlevels[level].y>-100) {
        objlevels[level].y-=10;
      }
    }
    else {//Sahne temizlendikten sonra welldone sesi oynatılıyor.
      var welldone= new Audio('sounds/welldone.mp3');
      welldone.play();
      answer1.y=900;//cevap yazıları ve balonlar eski noktalarına ışınlanıyor. ekran dışında aşağıda yükselmeye hazır.
      answer2.y=900;
      answer3.y=900;
      baloon1.y=900;
      baloon2.y=900;
      baloon3.y=900;
      level+=1//level değişkeni 1 artırılıyor.
      currentcandles=[];//round geçildiği için currentcandlesdaki mumlar siliniyor ve boş array yapılıyor.
      //level 5 olana kadar bu döngü devam ediyor.


      if (level==5) {//level 5 oldu ise,
        gamestage=6;//gamestage 6 yani oyun sonuna geçilyior.
        cake1=this.add.sprite(150,900,"cake1");//oyun sonu için altlara sırayla 4 pasta ekledim.
        cake2=this.add.sprite(350,900,"cake2");
        cake3=this.add.sprite(550,900,"cake3");
        cake4=this.add.sprite(700,900,"cake4");
        cake1.setScale(0.4);//ve boyutlarını %40a azattım.
        cake2.setScale(0.4);
        cake3.setScale(0.4);
        cake4.setScale(0.4);
        var alkis=new Audio("sounds/applause.mp3");//alkış ses oynattım.
        alkis.play();
      }
      else {//level 5 değil ise tekrar gamestage 2 ye dönülerek yeni bir bölüm geliyor.
        gamestage=2;
      }
    }
  }
  if (gamestage==6) {//oyun sonu durumu
    if (sprwelldone.y!=150) {//oyun sonu resimleri ilgili yerlere kayarak geliyor. Eğer tekrar oynaya basılırsa sayfa yenilenecek ve tekrar oynanabilecek.
      sprwelldone.y+=10;
    }
    if (playagain.y!=370) {
      playagain.y-=10;
    }
    if (cake1.y!=450) {
      cake1.y-=10;
      cake2.y-=8;
      cake3.y-=9;
      cake4.y-=11;
    }
  }
}
