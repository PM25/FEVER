doc_ready(main);

function doc_ready(fn) {
    // see if DOM is already available
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

const _ = undefined;

// start from here
function main() {
    let input_area = document.querySelector("#input-txt");
    let input_area2 = document.querySelector("#question-txt");
    let database = { data: "", updating: false };
    load_data(database);
    wrap_text(input_area, database);
    wrap_text(input_area2, database);

    let switchbtn = document.getElementById("switchbtn");
    switchbtn.addEventListener("click", () => {
        switchbtn.classList.toggle("active-btn");
        if (switchbtn.classList.contains("active-btn")) {
            execute(database);
        } else {
            input_area.innerHTML =
                input_area.innerText || input_area.textContent;
            input_area2.innerHTML =
                input_area2.innerText || input_area2.textContent;
            wrap_text(input_area, database);
            wrap_text(input_area2, database);
        }
    });

    input_area.addEventListener("input", () => {
        if (switchbtn.classList.contains("active-btn")) {
            execute(database);
        }
    });

    let threshold_slider = document.getElementById("threshold-slider"),
        threshold_value = document.getElementById("threshold-value"),
        last_value = threshold_slider.value / 20;

    threshold_slider.addEventListener("input", () => {
        let value = threshold_slider.value / 20;
        threshold_value.innerHTML = value.toFixed(2);
        if (switchbtn.classList.contains("active-btn") && value != last_value) {
            execute(database);
            last_value = value;
        }
    });

    let threshold_slider2 = document.getElementById("threshold-slider2"),
        threshold_value2 = document.getElementById("threshold-value2"),
        last_value2 = threshold_slider2.value / 20;

    threshold_slider2.addEventListener("input", () => {
        let value = -threshold_slider2.value / 20;
        threshold_value2.innerHTML = value.toFixed(2);
        if (
            switchbtn.classList.contains("active-btn") &&
            value != last_value2
        ) {
            execute(database);
            last_value2 = value;
        }
    });

    let btn1 = document.getElementById("data1");
    btn1.addEventListener("click", () => {
        input_area.innerText =
            "He won a Golden Globe Award and an Academy Award for Best Actor for his role in Philadelphia , as well as a Golden Globe , an Academy Award , a Screen Actors Guild Award , and a People 's Choice Award for Best Actor for his role in Forrest Gump . Philadelphia Philadelphia (film) Forrest Gump Forrest Gump Golden Globe Award Golden Globe Award Academy Award for Best Actor Academy Award for Best Actor Screen Actors Guild Award Screen Actors Guild Award Tom_Hanks. In 2004 , he received the Stanley Kubrick Britannia Award for Excellence in Film from the British Academy of Film and Television Arts -LRB- BAFTA -RRB- . British Academy of Film and Television Arts British Academy of Film and Television Arts Tom_Hanks. In 2014 , he received a Kennedy Center Honor and , in 2016 , he received a Presidential Medal of Freedom from President Barack Obama , as well as the French Legion of Honor . Kennedy Center Honor Kennedy Center Honors Presidential Medal of Freedom Presidential Medal of Freedom President President of the United States Barack Obama Barack Obama Legion of Honor Legion of Honor";
        input_area2.innerText = "Tom Hanks is incapable of receiving awards.";
        input_area.innerHTML = input_area.innerText || input_area.textContent;
        wrap_text(input_area, database);
        wrap_text(input_area2, database);
    });

    let btn2 = document.getElementById("data2");
    btn2.addEventListener("click", () => {
        input_area.innerText =
            "It honors the American labor movement and the contributions that workers have made to the strength , prosperity , laws and well-being of the country . American labor movement Labor history of the United States laws United States labor law labor movement labor movement";
        input_area2.innerText =
            "Labor Day is incapable of honoring the American labor movement.";
        input_area.innerHTML = input_area.innerText || input_area.textContent;
        wrap_text(input_area, database);
        wrap_text(input_area2, database);
    });
}

function wrap_text(input_area, database) {
    let text = input_area.innerText || input_area.textContent;
    input_area.innerHTML = text.replace(
        /(\w+)/g,
        "<span class='$1 word-span'>$1</span>"
    );

    // if (database.updating == true) {
    //     setTimeout(() => {
    //         wrap_text(input_area, database);
    //     }, 30);
    // } else {
    //     let all_words = document.querySelectorAll(".word-span");
    //     all_words.forEach((word) => {
    //         word_score = database.data;
    //         let word_text = word.textContent.toLowerCase();

    //         if (word_score[word_text] !== undefined) {
    //             word.classList.add("target-word");
    //         }
    //     });
    // }
}

function execute(database) {
    // console.log(database.updating);
    if (database.updating == true) {
        setTimeout(() => {
            execute(database);
        }, 30);
    } else {
        // input_area.innerHTML = input_area.innerText || input_area.textContent;
        // let all_words = document.querySelectorAll(".target-word");
        let all_words = document.querySelectorAll(".word-span");
        let threshold_slider = document.getElementById("threshold-slider");
        let threshold = threshold_slider.value / 20;
        let threshold_slider2 = document.getElementById("threshold-slider2");
        let threshold2 = -threshold_slider2.value / 20;

        let word_score = database.data;

        all_words.forEach((word) => {
            word.style.backgroundColor = "";
            word = word.textContent.toLocaleLowerCase();

            if (
                word_score[word] <= threshold &&
                word_score[word] >= threshold2
            ) {
                let scale_ratio = word_score[word].toPrecision(2);
                let color = null;
                if (scale_ratio > 0) {
                    color = d3.interpolatePuBu(scale_ratio);
                } else {
                    color = d3.interpolateYlOrBr(-scale_ratio);
                }

                // the match word can't have any character next to it
                let selected_words = document.querySelectorAll(
                    "#input-txt ." + word
                );
                selected_words.forEach((word) => {
                    word.style.backgroundColor = color;
                });

                selected_words = document.querySelectorAll(
                    "#question-txt ." + word
                );
                selected_words.forEach((word) => {
                    word.style.backgroundColor = color;
                });
            }
        });
    }
}

function get_words(input_area, database) {
    // console.log(database.updating);
    if (database.updating == true) {
        setTimeout(() => {
            execute(input_area, scale, database);
        }, 50);
    } else {
        let words_count = {};
        let threshold_slider = document.getElementById("threshold-slider");
        let threshold = threshold_slider.value / 20;

        let txt = input_area.innerText || input_area.textContent;
        let word_score = database.data;
        let unique_words = txt.match(/\b(\w+)\b/g).filter(onlyUnique);
        unique_words.forEach((word) => {
            if (word_score[word.toLowerCase()] >= threshold) {
                words_count[word.toLowerCase()] =
                    (words_count[word.toLowerCase()] || 0) + 1;
            }
        });
        return Object.entries(words_count);
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
}

function load_data(database) {
    database.updating = true;
    read_file("source/data/norm_terms.json", (data) => {
        database.data = JSON.parse(data);
        database.updating = false;
        console.log(database.data);
    });
}

// read external files
function read_file(fpath, callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", fpath, true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == "200") {
            callback(this.responseText);
        }
    };
    xmlhttp.send();
}
