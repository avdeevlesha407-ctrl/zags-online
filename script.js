document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       НАСТРОЙКИ SUPABASE
    ========================================== */

    const SUPABASE_URL =
        "https://urpyixokiisyyjyfqdqp.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_7Pc3MuZhmSqFv3_R0gZnrg_8YUQyI0K";


    /* ==========================================
       ПОДКЛЮЧЕНИЕ SUPABASE
    ========================================== */

    const supabase = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


    /* ==========================================
       ОТКРЫТИЕ ФОРМЫ ЗАЯВЛЕНИЯ
    ========================================== */

    window.openApplication = function () {

        const modal =
            document.getElementById("applicationModal");

        if (!modal) return;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    };


    /* ==========================================
       ЗАКРЫТИЕ ФОРМЫ ЗАЯВЛЕНИЯ
    ========================================== */

    window.closeApplication = function () {

        const modal =
            document.getElementById("applicationModal");

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow = "";

    };


    /* ==========================================
       КЛИК ВНЕ ОКНА ЗАЯВЛЕНИЯ
    ========================================== */

    const applicationModal =
        document.getElementById("applicationModal");

    if (applicationModal) {

        applicationModal.addEventListener(
            "click",
            function (event) {

                if (event.target === applicationModal) {

                    closeApplication();

                }

            }
        );

    }


    /* ==========================================
       ОТПРАВКА ЗАЯВЛЕНИЯ
    ========================================== */

    const form =
        document.getElementById("applicationForm");


    if (form) {

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const groomSurname =
                    document
                        .getElementById("groomSurname")
                        .value
                        .trim();

                const groomName =
                    document
                        .getElementById("groomName")
                        .value
                        .trim();

                const groomPatronymic =
                    document
                        .getElementById("groomPatronymic")
                        .value
                        .trim();

                const groomBirth =
                    document
                        .getElementById("groomBirth")
                        .value;

                const groomPassportSeries =
                    document
                        .getElementById("groomPassportSeries")
                        .value
                        .trim();

                const groomPassportNumber =
                    document
                        .getElementById("groomPassportNumber")
                        .value
                        .trim();


                const brideSurname =
                    document
                        .getElementById("brideSurname")
                        .value
                        .trim();

                const brideName =
                    document
                        .getElementById("brideName")
                        .value
                        .trim();

                const bridePatronymic =
                    document
                        .getElementById("bridePatronymic")
                        .value
                        .trim();

                const brideBirth =
                    document
                        .getElementById("brideBirth")
                        .value;

                const bridePassportSeries =
                    document
                        .getElementById("bridePassportSeries")
                        .value
                        .trim();

                const bridePassportNumber =
                    document
                        .getElementById("bridePassportNumber")
                        .value
                        .trim();


                const marriageDate =
                    document
                        .getElementById("marriageDate")
                        .value;

                const marriageTime =
                    document
                        .getElementById("marriageTime")
                        .value;

                const zagsPlace =
                    document
                        .getElementById("zagsPlace")
                        .value;


                const contactPhone =
                    document
                        .getElementById("contactPhone")
                        .value
                        .trim();

                const contactEmail =
                    document
                        .getElementById("contactEmail")
                        .value
                        .trim();


                const agreement =
                    document
                        .getElementById("agreement")
                        .checked;


                if (!agreement) {

                    alert(
                        "Необходимо подтвердить согласие."
                    );

                    return;

                }


                /* ==================================
                   НОМЕР ЗАЯВЛЕНИЯ
                ================================== */

                const randomNumber =
                    Math.floor(
                        100000 +
                        Math.random() * 900000
                    );


                const applicationNumber =
                    "ZAGS-" + randomNumber;


                /* ==================================
                   СОХРАНЕНИЕ В SUPABASE
                ================================== */

                const { error } =
                    await supabase
                        .from("applications")
                        .insert([{

                            application_number:
                                applicationNumber,

                            service:
                                "Регистрация брака",

                            groom_surname:
                                groomSurname,

                            groom_name:
                                groomName,

                            groom_patronymic:
                                groomPatronymic,

                            groom_birth:
                                groomBirth,

                            groom_passport_series:
                                groomPassportSeries,

                            groom_passport_number:
                                groomPassportNumber,

                            bride_surname:
                                brideSurname,

                            bride_name:
                                brideName,

                            bride_patronymic:
                                bridePatronymic,

                            bride_birth:
                                brideBirth,

                            bride_passport_series:
                                bridePassportSeries,

                            bride_passport_number:
                                bridePassportNumber,

                            marriage_date:
                                marriageDate,

                            marriage_time:
                                marriageTime,

                            zags_place:
                                zagsPlace,

                            phone:
                                contactPhone,

                            email:
                                contactEmail,

                            status:
                                "На рассмотрении"

                        }]);


                if (error) {

                    console.error(error);

                    alert(
                        "Не удалось сохранить заявление.\n\n" +
                        error.message
                    );

                    return;

                }


                /* ==================================
                   УСПЕШНАЯ ОТПРАВКА
                ================================== */

                document.getElementById(
                    "applicationForm"
                ).style.display = "none";


                document.getElementById(
                    "applicationSuccess"
                ).style.display = "block";


                document.getElementById(
                    "applicationNumber"
                ).textContent =
                    applicationNumber;


                document.getElementById(
                    "successService"
                ).textContent =
                    "Регистрация брака";


                document.getElementById(
                    "successDate"
                ).textContent =
                    marriageDate +
                    " в " +
                    marriageTime;


                document.getElementById(
                    "successPlace"
                ).textContent =
                    zagsPlace;

            });

    }


    /* ==========================================
       ПРОВЕРКА СТАТУСА
    ========================================== */

    window.checkStatus = async function () {

        const input =
            document
                .getElementById("statusNumber")
                .value
                .trim()
                .toUpperCase();


        const result =
            document.getElementById("statusResult");


        if (input === "") {

            result.textContent =
                "Введите номер заявления.";

            return;

        }


        const { data, error } =
            await supabase
                .from("applications")
                .select("*")
                .eq(
                    "application_number",
                    input
                )
                .maybeSingle();


        if (error) {

            console.error(error);

            result.textContent =
                "Ошибка проверки заявления.";

            return;

        }


        if (!data) {

            result.textContent =
                "Заявление с таким номером не найдено.";

            return;

        }


        result.innerHTML =
            "✓ Заявление найдено. " +
            "Статус: <strong>" +
            data.status +
            "</strong>";

    };


    /* ==========================================
       ПЕРЕЙТИ К ЗАЯВЛЕНИЯМ
    ========================================== */

    window.scrollToStatus = function () {

        const status =
            document.getElementById("status");

        if (!status) return;

        status.scrollIntoView({
            behavior: "smooth"
        });

    };


    /* ==========================================
       ОТКРЫТИЕ ОТЗЫВА
    ========================================== */

    window.openReviewModal = function () {

        const modal =
            document.getElementById("reviewModal");

        if (!modal) return;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    };


    /* ==========================================
       ЗАКРЫТИЕ ОТЗЫВА
    ========================================== */

    window.closeReviewModal = function () {

        const modal =
            document.getElementById("reviewModal");

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow = "";

    };


    /* ==========================================
       КЛИК ВНЕ ОКНА ОТЗЫВА
    ========================================== */

    const reviewModal =
        document.getElementById("reviewModal");

    if (reviewModal) {

        reviewModal.addEventListener(
            "click",
            function (event) {

                if (event.target === reviewModal) {

                    closeReviewModal();

                }

            }
        );

    }


    /* ==========================================
       КОНТЕЙНЕР ОТЗЫВОВ
    ========================================== */

    const reviewsGrid =
        document.querySelector(".reviews-grid");


    /* ==========================================
       СОЗДАНИЕ КАРТОЧКИ ОТЗЫВА
    ========================================== */

    function createReviewCard(review) {

        const card =
            document.createElement("div");

        card.className =
            "review-card";


        const firstLetter =
            review.name
                ? review.name
                    .charAt(0)
                    .toUpperCase()
                : "?";


        const rating =
            Number(review.rating) || 0;


        let stars = "";

        for (let i = 1; i <= 5; i++) {

            stars +=
                i <= rating
                    ? "★"
                    : "☆";

        }


        const top =
            document.createElement("div");

        top.className =
            "review-top";


        const avatar =
            document.createElement("div");

        avatar.className =
            "review-avatar";

        avatar.textContent =
            firstLetter;


        const user =
            document.createElement("div");


        const name =
            document.createElement("strong");

        name.textContent =
            review.name;


        const city =
            document.createElement("span");

        city.textContent =
            review.city;


        user.appendChild(name);

        user.appendChild(city);


        top.appendChild(avatar);

        top.appendChild(user);


        const starsElement =
            document.createElement("div");

        starsElement.className =
            "review-stars";

        starsElement.textContent =
            stars;


        const text =
            document.createElement("p");

        text.textContent =
            review.text;


        const service =
            document.createElement("small");

        service.textContent =
            "Отзыв пользователя";


        card.appendChild(top);

        card.appendChild(starsElement);

        card.appendChild(text);

        card.appendChild(service);


        return card;

    }


    /* ==========================================
       ЗАГРУЗКА ОТЗЫВОВ
    ========================================== */

    async function loadReviews() {

        if (!reviewsGrid) {

            console.error(
                "Не найден контейнер .reviews-grid"
            );

            return;

        }


        const { data, error } =
            await supabase
                .from("reviews")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );


        if (error) {

            console.error(
                "Ошибка загрузки отзывов:",
                error
            );

            return;

        }


        /*
         * Удаляем стандартные отзывы
         * Анна / Максим / Елена
         */

        reviewsGrid.innerHTML = "";


        if (!data || data.length === 0) {

            const empty =
                document.createElement("p");

            empty.textContent =
                "Пока нет отзывов. Будьте первым!";

            reviewsGrid.appendChild(empty);

            return;

        }


        data.forEach(function (review) {

            const card =
                createReviewCard(review);

            reviewsGrid.appendChild(card);

        });

    }


    /* ==========================================
       ОТПРАВКА ОТЗЫВА
    ========================================== */

    const reviewForm =
        document.getElementById("reviewForm");


    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("reviewName")
                        .value
                        .trim();


                const city =
                    document
                        .getElementById("reviewCity")
                        .value
                        .trim();


                const rating =
                    Number(
                        document
                            .getElementById("reviewRating")
                            .value
                    );


                const text =
                    document
                        .getElementById("reviewText")
                        .value
                        .trim();


                if (
                    !name ||
                    !city ||
                    !rating ||
                    !text
                ) {

                    alert(
                        "Заполните все поля."
                    );

                    return;

                }


                /* ==================================
                   СОХРАНЕНИЕ ОТЗЫВА
                ================================== */

                const { data, error } =
                    await supabase
                        .from("reviews")
                        .insert([{

                            name: name,

                            city: city,

                            rating: rating,

                            text: text

                        }])
                        .select()
                        .single();


                if (error) {

                    console.error(
                        "Ошибка сохранения отзыва:",
                        error
                    );

                    alert(
                        "Не удалось отправить отзыв.\n\n" +
                        error.message
                    );

                    return;

                }


                /* ==================================
                   ДОБАВЛЯЕМ ОТЗЫВ СРАЗУ НА СТРАНИЦУ
                ================================== */

                if (reviewsGrid && data) {

                    /*
                     * Если это первый отзыв,
                     * убираем сообщение "нет отзывов"
                     */

                    const empty =
                        reviewsGrid.querySelector(
                            ".reviews-empty"
                        );

                    if (empty) {

                        empty.remove();

                    }


                    const card =
                        createReviewCard(data);


                    reviewsGrid.prepend(card);

                }


                /* ==================================
                   ПОКАЗЫВАЕМ УСПЕХ
                ================================== */

                reviewForm.style.display =
                    "none";


                const success =
                    document.getElementById(
                        "reviewSuccess"
                    );


                if (success) {

                    success.style.display =
                        "block";

                }

            });

    }


    /* ==========================================
       ЗАГРУЖАЕМ ОТЗЫВЫ ПРИ ОТКРЫТИИ СТРАНИЦЫ
    ========================================== */

    loadReviews();


    /* ==========================================
       FAQ
    ========================================== */

    window.toggleFaq = function (button) {

        const item =
            button.parentElement;


        const wasActive =
            item.classList.contains("active");


        document
            .querySelectorAll(".faq-item")
            .forEach(function (faq) {

                faq.classList.remove("active");


                const span =
                    faq.querySelector(
                        "button span"
                    );


                if (span) {

                    span.textContent = "+";

                }

            });


        if (!wasActive) {

            item.classList.add("active");


            const span =
                button.querySelector("span");


            if (span) {

                span.textContent = "−";

            }

        }

    };


    /* ==========================================
       ВРЕМЕННЫЕ КНОПКИ
    ========================================== */

    window.showMessage = function (text) {

        alert(
            text +
            "\n\nЭтот раздел пока находится в разработке."
        );

    };


    /* ==========================================
       ESC
    ========================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeApplication();

                closeReviewModal();

            }

        }
    );

});