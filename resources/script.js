document.addEventListener("DOMContentLoaded", ()=>{

    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");

    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;

    const properties = {
        radius: 4,
        count_of_circle: 90,
        speed: 0.5,
        length: 150,
        life_circle: 5
    }

    let array_of_circle = [];

    let animation_id;

    // Обработчики событий бегунков, которые изменяют параметры отрисовки
    new_radius.addEventListener("change", ()=>{
        properties.radius = ((+new_radius.value) / 100) * 15;
    });

    new_count_of_circle.addEventListener("change", ()=>{
        cancelAnimationFrame(animation_id);
        array_of_circle = [];
        properties.count_of_circle = ((+new_count_of_circle.value) / 100) * 200;
        main();
    });

    new_speed.addEventListener("change", ()=>{
        properties.speed = ((+new_speed.value) / 100) * 3;
    });

    new_length.addEventListener("change", ()=>{
        properties.length = ((+new_length.value) / 100) * 250;
    });

    new_life_circle.addEventListener("change", ()=>{
        properties.life_circle = ((+new_life_circle.value) / 100) * 10;
    });

    window.onresize = ()=>{
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
    }


    class Circle{
        constructor(){
            this.x = Math.round(Math.random() * canvas.width),
            this.y = Math.round(Math.random() * canvas.height)
            this.speed_x = Math.random() * 2 * properties.speed - properties.speed;     // Данная запись явл. более понятной
            this.speed_y = Math.random() * 2 * properties.speed - properties.speed;
            this.life = Math.random() * properties.life_circle * 60;
        }

        //Иммитация смерти кружка
        delete_and_create_new_circle(){
            if(this.life < 1){
                this.x = Math.round(Math.random() * canvas.width),
                this.y = Math.round(Math.random() * canvas.height)
                this.speed_x = Math.random() * 2 * properties.speed - properties.speed;
                this.speed_y = Math.random() * 2 * properties.speed - properties.speed;
                this.life = Math.random() * properties.life_circle * 60;
            }
            this.life--;
        }
    }
    
    function create_circle(){
        for(let i = 0; i < properties.count_of_circle; i++){
            array_of_circle.push(new Circle());
        }
    }

    function clear_frame(){
        context.fillStyle = "#222";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw_circles(){
        array_of_circle.forEach(circle =>{
            context.beginPath();
            context.arc(circle.x, circle.y, properties.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = "red";
            context.fill();

            circle.x += circle.speed_x;
            if(((circle.x + properties.radius) >= canvas.width) || ((circle.x - properties.radius) <= 0)){
                circle.speed_x = -circle.speed_x;
            }

            circle.y += circle.speed_y;
            if(((circle.y + properties.radius) >= canvas.height) || ((circle.y - properties.radius) <= 0)){
                circle.speed_y = -circle.speed_y;
            }

            if(circle.life < 1){
                circle.x = Math.round(Math.random() * canvas.width),
                circle.y = Math.round(Math.random() * canvas.height)
                circle.speed_x = Math.random() * 2 * properties.speed - properties.speed;
                circle.speed_y = Math.random() * 2 * properties.speed - properties.speed;
                circle.life = Math.random() * properties.life_circle * 40;
            }
            circle.life--;
            
        });
    }
    
    function draw_line(){
        let x1, x2, y1, y2, opacity, length;
        for(let i = 0; i < array_of_circle.length; i++){
            for(let j = 0; j < array_of_circle.length; j++){
                x1 = array_of_circle[i].x;
                x2 = array_of_circle[j].x;
                y1 = array_of_circle[i].y;
                y2 = array_of_circle[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if(length < properties.length){
                    opacity = 1 - length / properties.length;
                    context.lineWidth = 0.5;
                    context.strokeStyle = "rgba(209, 19, 19, " + opacity + ")";
                    context.beginPath();
                    context.moveTo(x1, y1);
                    context.lineTo(x2, y2);
                    context.closePath();
                    context.stroke();
                }
            }
        }

    }


    function draw_content(){
        animation_id = requestAnimationFrame(draw_content);
        clear_frame();
        draw_circles();
        draw_line();
    }

    function main(){
        create_circle(); //Однократный вызов для создания кругов
        draw_content();  //Многократынй вызов. Отвечает за создание анимации
    }


    main();

});