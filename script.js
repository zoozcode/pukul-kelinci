// const tanah = document.querySelectorAll('.tanah');
// const tikus = document.querySelectorAll('.tikus');

// let tanahSebelumnya

// function randomTanah(tanah){
//     const t = Math.floor(Math.random() * tanah.length);
//     const tRandom = tanah[t];
//     if( tRandom == tanahSebelumnya){
//         randomTanah(tanah);
//     }
//     tanahSebelumnya = tRandom;

//     return tRandom;
// }

// function randomWaktu(min, max){
//     return Math.round(Math.random() * (max - min) + min);
// }

// function munculkanTikus(tanah){
//     const tRandom = randomTanah(tanah);
//     const wRandom = randomWaktu(300, 1500);
//     tRandom.classList.add('muncul');

//     setTimeout(() => {
//         tRandom.classList.remove('muncul');
//         munculkanTikus();
//      }, wRandom);
// }

// munculkanTikus(tanah); 




// window.onload = function () {
//   const tanah = document.querySelectorAll('.tanah');
//   const tikus = document.querySelectorAll('.tikus');

//   let tanahSebelumnya;

//   function randomTanah(tanah) {
//     const t = Math.floor(Math.random() * tanah.length);
//     const tRandom = tanah[t];
//     if (tRandom == tanahSebelumnya) {
//       return randomTanah(tanah);
//     }
//     tanahSebelumnya = tRandom;
//     return tRandom;
//   }

//   function randomWaktu(min, max) {
//     return Math.round(Math.random() * (max - min) + min);
//   }

//   function munculkanTikus(tanah) {
//     const tRandom = randomTanah(tanah);
//     const wRandom = randomWaktu(300, 1500);
//     tRandom.classList.add('muncul');

//     setTimeout(() => {
//       tRandom.classList.remove('muncul');
//       munculkanTikus(tanah);
//     }, wRandom);
//   }

//   munculkanTikus(tanah); // ← jalankan setelah semuanya siap
// };



const tanah = document.querySelectorAll('.tanah');
    const tikus = document.querySelectorAll('.tikus');
    const papanSkor = document.querySelector('.papan-skor');
    const pop = document.querySelector('#pop');

    let tanahSebelumnya;
    let selesai;
    let skor;

    function randomTanah(tanah) {
      const t = Math.floor(Math.random() * tanah.length);
      const tTerpilih = tanah[t];
      if (tTerpilih === tanahSebelumnya) {
        return randomTanah(tanah);
      }
      tanahSebelumnya = tTerpilih;
      return tTerpilih;
    }

    function randomWaktu(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    function munculkanTikus() {
      const t = randomTanah(tanah);
      const waktu = randomWaktu(1000, 2000);
      t.classList.add('muncul');

      setTimeout(() => {
        t.classList.remove('muncul');
        if (!selesai) munculkanTikus();
      }, waktu);
    }

    function mulai() {
      selesai = false;
      skor = 0;
      papanSkor.textContent = 0;
      munculkanTikus();
      setTimeout(() => selesai = true, 50000);
    }

    function pukul() {
      if (!this.parentNode.classList.contains('muncul')) return;
      skor++;
      this.parentNode.classList.remove('muncul');
      pop.play();
      papanSkor.textContent = skor;
    }

    tikus.forEach(t => t.addEventListener('click', pukul));
    document.getElementById('mulai').addEventListener('click', mulai);