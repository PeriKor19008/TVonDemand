function autoEnter()
{
    var input = document.getElementById("loginTextField");
    input.addEventListener("keypress",
    function(event)
    {
        if(event.key === "Enter")
        {
            event.preventDefault();
            document.getElementById("loginButton").click();
        }
    });
}