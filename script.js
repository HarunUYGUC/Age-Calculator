const date = document.getElementById('selectDate');
const calcBtn = document.querySelector('.calculate');
const result = document.querySelector('#result');

date.addEventListener("click", function() {
    date.value = "";

    date.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            calculateAge();
        }
    });
});

calcBtn.addEventListener('click', calculateAge);

function calculateAge() {
    if (!date.value) {
        result.innerHTML = "Lütfen bir tarih seçin.";
        return;
    }

    const parts = date.value.split('.'); // GG.AA.YYYY
    const selectedDate = new Date(parts[2], parts[1] - 1, parts[0]); // Y, M, G
    const today = new Date();

    const sd = selectedDate.getDate();
    const sm = selectedDate.getMonth() + 1; // Aylar 0'dan başlıyor
    const sy = selectedDate.getFullYear();

    const td = today.getDate();
    const tm = today.getMonth() + 1;
    const ty = today.getFullYear();

    let age = ty - sy;
    let month = tm - sm;
    let day = td - sd;

    if (day < 0) {
        month--;
        const daysInPrevMonth = new Date(ty, tm - 1, 0).getDate(); // Önceki ayın gün sayısı
        day += daysInPrevMonth;
    }

    if (month < 0) {
        age--;
        month += 12;
    }

    let ageCategory = "";

    if (age < 0) {
        ageCategory = "Henüz doğmadınız!";
    } 
    else if (age <= 12) {
        ageCategory = "Çocuk";
    } 
    else if (age <= 17) {
        ageCategory = "Ergen";
    } 
    else if (age <= 64) {
        ageCategory = "Yetişkin";
    } 
    else {
        ageCategory = "Yaşlılık dönemi";
    }

     result.innerHTML = `${age} yaşındasınız. Diğer yılda ${month} ay, ${day} gün ilerlemişsiniz.<br><strong>Kategori:</strong> ${ageCategory}`;
}
