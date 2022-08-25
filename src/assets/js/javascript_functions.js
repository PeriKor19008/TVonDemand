function autoEnter(elementName, buttonName)
{
    var input = document.getElementById(elementName);
    console.log(input);
    input.addEventListener("keypress",
    function(event)
    {
        if(event.key === "Enter")
        {
            event.preventDefault();
            document.getElementById(buttonName).click();
        }
    });
}