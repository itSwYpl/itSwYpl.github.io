let tokensMined = 0;
const miningSpeedPerSecond = 20 / 3600; // Скорость майнинга в токенах в секунду
const minTokensToClaim = 2;
let canClaimTokens = false;

// Функция для обновления данных о майнинге
function updateMiningData() {
  const currentTime = new Date().getTime();
  const timePassedSeconds = (currentTime - startTime) / 1000;
  const minedThisSecond = miningSpeedPerSecond * timePassedSeconds;
  tokensMined = parseFloat(minedThisSecond.toFixed(4)); // Округляем до 4 знаков после запятой и преобразуем в число

  document.getElementById("tokens-mined").innerText = tokensMined.toFixed(4); // Отображаем с четырьмя знаками после запятой

  // Проверяем, можно ли уже забирать токены
  canClaimTokens = tokensMined >= minTokensToClaim;
  document.getElementById("claim-btn").disabled = !canClaimTokens;

  // Показываем таймер до сгорания токенов через 6 часов
  const timeLeftSeconds = Math.max(0, 6 * 3600 - timePassedSeconds);
  const hoursLeft = Math.floor(timeLeftSeconds / 3600);
  const minutesLeft = Math.floor((timeLeftSeconds % 3600) / 60);
  const secondsLeft = Math.floor(timeLeftSeconds % 60);
  document.getElementById(
    "timer"
  ).innerText = `Таймер: ${hoursLeft}ч ${minutesLeft}м ${secondsLeft}с`;
}

// Функция для забора токенов
function claimTokens() {
  const tokensToClaim = Math.max(minTokensToClaim, tokensMined); // Минимальное количество для забора - 2 токена
  alert(`Вы забрали ${tokensToClaim.toFixed(4)} токенов!`); // Отображаем с четырьмя знаками после запятой
  tokensMined -= tokensToClaim;
  document.getElementById("tokens-mined").innerText = tokensMined.toFixed(4); // Отображаем с четырьмя знаками после запятой
  updateMiningData(); // Обновляем данные после забора токенов
}
// Вызываем функцию обновления данных о майнинге каждую секунду
const startTime = new Date().getTime();
setInterval(updateMiningData, 1000);
