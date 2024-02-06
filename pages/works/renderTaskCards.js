let tasks = [];

/* Запрос в mokkydev */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    /* Кладем полученные данные в массив tasks */
    tasks = await fetch('https://13e0b7c912f82bbc.mokky.dev/tasks')
      .then((res) => res.json())
      .then((data) => data);
  } catch (err) {
    /* В случае ошибки сообщить об этом в консоль */
    console.log(err);
  }

  // Темплейт карточки

  const cardTemplate = document.querySelector('#card-template').content;

  // Место под task в DOM

  const cardsContainer = document.querySelector('.offer__list');

  // Функция создания карточки

  function createCard(cardData) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardLink = card.querySelector('.card__link');
    const cardName = card.querySelector('.card__name');
    const cardPosted = card.querySelector('.card__posted');
    const cardAmount = card.querySelector('.card__amount');
    const cardDeadline = card.querySelector('.card__deadline');
    const cardTags = card.querySelector(".card__tags");
    const cardDescription = card.querySelector('.card__description');

    cardLink.href = cardData.name;
    cardName.textContent = cardData.name;
    cardPosted.textContent = cardData.posted;
    cardAmount.textContent = cardData.amount;
    cardDeadline.textContent = cardData.deadline + ' deadline';
    cardDescription.textContent = cardData.description;

    /* Добавление тегов из массива cardData.tags */
    cardData.tags.forEach(tag => {
      cardTags.insertAdjacentHTML(
        "beforeEnd",
        `<li class="card__tag">
          <a class="flex justify-center items-center h-[28px] border bg-[#BFBFBF] rounded-[40px] px-2.5 hover:bg-black transition-colors duration-300" href="#">
            ${tag}
          </a>
        </li>`
      );
    })
    
    return card;
  }

  // Вывести карточки на страницу

  tasks.forEach((item) => {
    const card = createCard(item);
    cardsContainer.append(card);
  });

});
