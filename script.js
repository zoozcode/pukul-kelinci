const tanah = document.querySelectorAll('.tanah');
    const tikus = document.querySelectorAll('.tikus');
    const papanSkor = document.querySelector('.papan-skor');
    const pop = document.querySelector('#pop');

    let tanahSebelumnya;
    let selesai;
    let skor;

   let score = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
document.getElementById("highScore").textContent = highScore;

function mukulIbnu() {
    score++;
    document.querySelector(".papan-skor").textContent = score;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        document.getElementById("highScore").textContent = highScore;
    }

    console.log("Score:", score, "| High Score:", highScore);
}

document.getElementById("mulai").addEventListener("click", () => {
    score = 0;
    document.querySelector(".papan-skor").textContent = score;

    // Ambil high score terbaru dari localStorage dan update tampilan
    highScore = parseInt(localStorage.getItem("highScore")) || 0;
    document.getElementById("highScore").textContent = highScore;
});


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
      setTimeout(() => selesai = true, 20000);
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

    // Tambahkan event click ke semua tikus
// const tikus = document.querySelectorAll('.tikus');
tikus.forEach(t => {
    t.addEventListener('click', mukulIbnu);
});
