var initial_text = "user@machine_name:~$ ";
var cursor_text = "_";
var input_string = "";
var history_length = 20;

var $history_div = $("#history");

(function() {
    $("#cursor_text").text(initial_text);
    $("#cursor_span").text(cursor_text);
})();

$(document).on('keydown', function(event) {
    // address special keys
    if (event.which == 8) {
        // backspace
        input_string = input_string.substring(0, input_string.length - 1);
        $("#text_added").text(input_string);
    } else if (event.which == 9) {
        // tab
    }
});

$(document).on('keypress', function(event) {
    var text = "";
    if (event.which == 13) {
        text = $("#text_added").text();
        add_history(text, true);
        do_command(text);
        input_string = "";
        add_text();
    } else {
        input_string = input_string + event.key;
        add_text();
    }
});

function do_command(command) {
    switch (command) {
        case "ls":
            add_history("README ", false);
            break;
        case "help":
            add_history("HTML bash, version 0.0.1", false);
            add_history("ls", false);
            add_history("cat", false);
            add_history("clear", false);
            break;
        case "clear":
            $("#history p").remove();
            break;
        case "cat README":
            add_history("Welcome to my HTML terminal page !", false);
            add_history("Hope you enjoy it, please see the code and make your own", false)
            break;
        default:
            add_history(command + ": command not found", false);
    }
}

function add_text() {
    $("#text_added").text(input_string);
}

function add_history(text, init_text) {
    if (init_text === true)
        $("#history").append($("<p>").addClass("green_line").text(initial_text + text));
    else
        $("#history").append($("<p>").addClass("green_line").text(text));
    while ($("#history").children().length >= history_length) {
        $("#history p:first").remove();
    }
}