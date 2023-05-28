const HH = document.getElementById('HH');
const MM = document.getElementById('MM');
const SS = document.getElementById('SS');
        
        setInterval( () => {
            const presentTime = new Date();    
            HH.textContent = presentTime.getHours();
            MM.textContent = presentTime.getMinutes();
            SS.textContent = presentTime.getSeconds();
        }, 1000);