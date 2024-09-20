import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(1500); // Sayacı saniye bazında başlatıyoruz (25 dakika = 1500 saniye)
  const [isRunning, setIsRunning] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25); // Dakika cinsinden
  const [shortBreakTime, setShortBreakTime] = useState(5); // Dakika cinsinden
  const [longBreakTime, setLongBreakTime] = useState(15); // Dakika cinsinden
  const [selectcolor, setSelectColor] = useState(0); // Mevcut renk
  const [tempSelectColor, setTempSelectColor] = useState(0); // Geçici renk
  const [selectFont, setSelectFont] = useState(0); // Mevcut font
  const [tempSelectFont, setTempSelectFont] = useState(0); // Geçici font
  const [onApply, setOnApply] = useState(false);
  const [activeTime, setActiveTime] = useState('pomodoro'); // Hangi zamanın aktif olduğunu tutuyoruz

  const colorOptions = ['#F87070', '#70F3F8', '#D881F8'];
  const fontOptions = [
    "'Space Mono', monospace",
    "'Roboto Slab', serif",
    "'Kumbh Sans', sans-serif",
  ];

  // Sayaç işlemi (her saniyede 1 azalır)
  useEffect(() => {
    if (!isRunning) return; // Sayaç durdurulduysa, interval başlatılmaz

    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount === 0 ? 0 : prevCount - 1)); // Sayaç sıfıra ulaşınca durur
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Aktif süreyi ayarlamak için fonksiyon (Dakika cinsinden süreleri saniyeye çeviriyoruz)
  function setTime(timetype, timeName) {
    setActiveTime(timeName); // Aktif zamanı belirle
    setCount(timetype * 60); // Dakika cinsinden gelen süreyi saniyeye çeviriyoruz
  }

  // "apply" butonuna tıklandığında geçici ayarları uygular
  function handleClickApplyBtn() {
    setOnApply(true);
    setSelectColor(tempSelectColor); // Geçici rengi kalıcı yap
    setSelectFont(tempSelectFont); // Geçici fontu kalıcı yap
    setShowOptions(false);
  }

  // "cancel" butonuna tıklandığında değişiklikleri geri alır
  function handleClickCancelBtn() {
    setOnApply(false);
    setTempSelectColor(selectcolor); // Geçici rengi eski renkle değiştir
    setTempSelectFont(selectFont); // Geçici fontu eski fontla değiştir
    setShowOptions(false);
  }

  // Renk seçimi
  function chooseColor(color) {
    setTempSelectColor(color); // Geçici renk seçimi
  }

  // Font seçimi
  function chooseFont(fontIndex) {
    setTempSelectFont(fontIndex); // Geçici font seçimi
  }

  // Sayacı "MM:SS" formatında göstermek için bir fonksiyon
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  return (
    <div className="container" style={{ fontFamily: fontOptions[selectFont] }}>
      <img src="../src/assets/pomodoro.svg"/>
      <div className="select-time-buttons">
        <button
          onClick={() => setTime(pomodoroTime, 'pomodoro')}
          style={{
            backgroundColor: activeTime === 'pomodoro' ? colorOptions[selectcolor] : 'transparent',
            color: activeTime === 'pomodoro' ? '#1E213F' : '',
          }}
        >
          pomodoro
        </button>
        <button
          onClick={() => setTime(shortBreakTime, 'shortBreak')}
          style={{
            backgroundColor: activeTime === 'shortBreak' ? colorOptions[selectcolor] : 'transparent',
            color: activeTime === 'shortBreak' ? '#1E213F' : '' ,
          }}
        >
          short break
        </button>
        <button
          onClick={() => setTime(longBreakTime, 'longBreak')}
          style={{
            backgroundColor: activeTime === 'longBreak' ? colorOptions[selectcolor] : 'transparent',
            color: activeTime === 'longBreak' ? '#1E213F' : '',
          }}
        >
          long break
        </button>
      </div>

      <div className="time-counter">
        <div className="counter" style={{ border: `7px solid ${colorOptions[selectcolor]}` }}>
          <h1>{formatTime(count)}</h1>
            <button
          onClick={() => {
            if (count === 0) {
              // Sayaç sıfırlandığında aktif zamana göre süreyi ayarla ve başlat
              if (activeTime === 'pomodoro') setCount(pomodoroTime * 60);
              if (activeTime === 'shortBreak') setCount(shortBreakTime * 60);
              if (activeTime === 'longBreak') setCount(longBreakTime * 60);
              setIsRunning(true); // Sayacı çalıştır
            } else {
              setIsRunning(!isRunning); // Sayacı durdur veya başlat
            }
          }}
        >
          {count === 0
            ? 'restart' 
            : isRunning
              ? 'pause' 
              : 'start'} 
        </button>
        </div>
      
      </div>

      <button className='settings-btn' onClick={() => setShowOptions(!showOptions)}><img src='../src/assets/settings.svg'/></button>

      {showOptions && (
        <div>
          <dialog className='modal' open={showOptions}>

            <h3>Settings</h3>


            <h4>TIME (MINUTES)</h4>
            <div className="select-time">

              <div className='select-time-item'>

                <span>pomodoro</span>
                <p>
                  {pomodoroTime}
                  <div>
                    <button onClick={() => setPomodoroTime((prevCount) => prevCount + 1)}><img src='../src/assets/plus.svg'/></button>
                    <button onClick={() => setPomodoroTime((prevCount) => prevCount - 1)}><img src='../src/assets/minus.svg'/></button>
                  </div>
                </p>

              </div>

              <div className='select-time-item'>
                <span>Short Break</span>
                  <p>
                    {shortBreakTime}
                    <div>
                      <button onClick={() => setShortBreakTime((prevCount) => prevCount + 1)}><img src='../src/assets/plus.svg'/></button>
                      <button onClick={() => setShortBreakTime((prevCount) => prevCount - 1)}><img src='../src/assets/minus.svg'/></button>
                    </div>
                  </p>
              </div>

             <div className="select-time-item">
               
                 <span>Long break</span>
                  <p>
                    {longBreakTime}
                    <div>
                      <button onClick={() => setLongBreakTime((prevCount) => prevCount + 1)}><img src='../src/assets/plus.svg'/></button>
                      <button onClick={() => setLongBreakTime((prevCount) => prevCount - 1)}><img src='../src/assets/minus.svg'/></button>
                    </div>
                  </p>

              </div>
            </div>

            
            <div className="select-color">
              <div className='title'>
                <h4>COLOR</h4>
              </div>

              <div className="color-option">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => chooseColor(index)}
                    style={{
                      backgroundColor: color,
                      border: tempSelectColor === index ? '2px solid black' : 'none',
                      position: 'relative',
                      width: '40px',
                      height: '40px',
                    }}
                  >
                    {tempSelectColor === index && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          color: 'white',
                          fontSize: '16px',
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}

              </div>
            </div>

            
            <div className="select-font">
              <h4>font</h4>
              <div>
                {fontOptions.map((font, index) => (
                  <button className='select-font-btn'
                    key={index}
                    onClick={() => chooseFont(index)}
                    style={{
                      fontFamily: font,
                      background: tempSelectFont === index ? 'black' : '#EFF1FA',
                      border: 'none',
                      color: tempSelectFont === index ? 'white' : '#1E213F',
                      fontSize: '16px',
                      padding: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Aa
                  </button>
                ))}
              </div>
            </div>

            <button className='apply-btn' onClick={handleClickApplyBtn}>Apply</button>
            <button className='cancel-btn' onClick={handleClickCancelBtn}>x</button>
          </dialog>
        </div>
      )}
    </div>
  );
}

export default App;


