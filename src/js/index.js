
const languages = {
  en: {
    headline: 'Rate your lunch',
    soup: 'Soup',
    main_course: 'Main course',
    garnish: 'Garnish',
    salad: 'Salad',
    compote: 'Compote',
    submit: 'Submit'
  },
  ru: {
    headline: 'Оцените обед',
    soup: 'Суп',
    main_course: 'Основное блюдо',
    garnish: 'Гарнир',
    salad: 'Салат',
    compote: 'Компот',
    submit: 'Отправить'
  },
  az: {
    headline: 'Yeməyinizi qiymətləndirin',
    soup: 'Sup',
    main_course: 'Əsas yemək',
    garnish: 'Əsas yeməklər',
    salad: 'Salat',
    compote: 'Kompot',
    submit: 'Göndər'
  }
};

function changeLanguage(lang) {
  const selectedLanguage = languages[lang];

  document.querySelector('.head_h h1').textContent = selectedLanguage.headline;

  const foodLabels = document.querySelectorAll('.food_name label');
  foodLabels.forEach((label, index) => {
    const key = Object.keys(selectedLanguage)[index + 1];
    label.textContent = selectedLanguage[key];
  });

  document.querySelector('.submit').value = selectedLanguage.submit;

  localStorage.setItem('selectedLanguage', lang);
}

const savedLanguage = localStorage.getItem('selectedLanguage');
if (savedLanguage) {
  changeLanguage(savedLanguage);
}

function getFeedbackValue(radioGroupName) {
  const radios = document.getElementsByName(radioGroupName);
  for (const radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
}

document.getElementById('lunchForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const today = new Date();

  const formattedDate = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
  const formattedTime = `${('0' + today.getHours()).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}`;
  const dateTime = `${formattedDate} ${formattedTime}`;

  const lunchData = {
    date: dateTime,
    soup: getFeedbackValue('soupStars'),
    mainCourse: getFeedbackValue('mainCourseStars'),
    garnish: getFeedbackValue('garnishStars'),
    salad: getFeedbackValue('saladStars'),
    compote: getFeedbackValue('compoteStars')
  };

  const previousData = localStorage.getItem('lunchFeedbacks');
  let allFeedbacks = previousData ? JSON.parse(previousData) : [];
  allFeedbacks.push(lunchData);
  localStorage.setItem('lunchFeedbacks', JSON.stringify(allFeedbacks));

  console.log(lunchData);


  const starContainers = document.querySelectorAll('.container__items');
  starContainers.forEach(container => {
      const selectedStar = container.querySelector('input[type="radio"]:checked');
      if (selectedStar) {
          selectedStar.checked = false;
      }
  });
});
