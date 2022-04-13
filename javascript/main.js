'use strict'

//preloader
const loader = document.getElementById("preloader");


window.addEventListener("load", function ()
{
    setTimeout(function ()
    {
        loader.style.display = 'none';
        console.log("Load completed");
    }, 2400);
});



//mouse cursor
const defaultCursors = document.querySelectorAll(".defaultCursor");
const cursors = document.querySelectorAll(".cursor");
document.addEventListener('mousemove', function (e)
{
    for (const cursor of cursors) {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    }
})
for (const defaultCursor of defaultCursors) {
    defaultCursor.addEventListener('mouseleave', function ()
    {
        for (const cursor of cursors) {
            cursor.classList.remove('cursorDefault');
        }
    })

    defaultCursor.addEventListener('mouseover', function ()
    {
        for (const cursor of cursors) {
            cursor.classList.add("cursorDefault");
        }
    })
}



//heading reload
document.querySelector(".heading--main").addEventListener("click", function ()
{
    location.reload();
})




//submit button event listener
document.querySelector(".submit").addEventListener("click", submit);
document.addEventListener('keydown', function (e)
{
    if (e.key === 'Enter')
    {
        submit();
    }
})



//submit function
function submit()
{
    const vectors = document.querySelectorAll(".vector");
    const vectorA = vectors[0].value;
    const vectorB = vectors[1].value;
    const vectorDot = document.querySelector(".vector--dot");
    const vectorCross = document.querySelector(".vector--cross");
    const vectorResult = document.querySelectorAll(".vector--output");
    
    
    console.log("start button clicked");
    //console.log(strAdd(vectorA));
    
    let vectorAComponents = split2(vectorA);
    let vectorBComponents = split2(vectorB);
    
    let ax = 0, ay = 0, az = 0, bx = 0, by = 0, bz = 0;

    for (const component of vectorAComponents)
    {
        if (component.toLowerCase().includes('i'))
        {
            ax = parseFloat(strRmv(component, 'i'));
        }
        else if (component.toLowerCase().includes('j'))
        {
            ay = parseFloat(strRmv(component, 'j'));
        }
        else if (component.toLowerCase().includes('k'))
        {
            az = parseFloat(strRmv(component, 'k'));
        }
    }


    for (const component of vectorBComponents)
    {
        if (component.toLowerCase().includes('i'))
        {
            bx = parseFloat(strRmv(component, 'i'));
        }
        else if (component.toLowerCase().includes('j'))
        {
            by = parseFloat(strRmv(component, 'j'));
        }
        else if (component.toLowerCase().includes('k'))
        {
            bz = parseFloat(strRmv(component, 'k'));
        }
    }
    

    if (vectorA != '' && vectorB != '')
    {
        for (const x of vectorResult)
        {
            if (x.classList.contains('hidden'))
            {
                x.classList.remove('hidden');
            }
        }
    }

    if (vectorA === '' || vectorB === '')
    {
        for (const x of vectorResult)
        {
            if (!x.classList.contains('hidden'))
            {
                x.classList.add('hidden');
            }
        }
        flashMessage("Enter two vectors properly", 1000);
    }
    else
    {
        flashMessage("Vectors submitted", 1000);
    }
    

    console.log(`ax=${ax}, ay=${ay}, az=${az}, bx=${bx}, by=${by}, bz=${bz}`);

    vectorDot.innerHTML = `Vector Dot product: <b>${dotProduct(ax, ay, az, bx, by, bz)}</b>`;
    vectorCross.innerHTML = `Vector Cross product: <b>${crossProduct(ax, ay, az, bx, by, bz)}</b>`;
}


const split2 = function(str)
{
    var newStr=[], raw=str[0], i;
    for (i = 1; i < str.length; i++)
    {
        if (str[i] === '+' || str[i] === '-' || i===str.length-1)
        {
            if (str[i] === '+' || str[i]==='-')
            {
                newStr.push(raw);
                raw = str[i];
                //raw = '+' + raw;
                //i++;
            }
            else if (i === str.length-1)
            {
                raw = raw + str[i];
                newStr.push(raw);
            }
        }
        else
        {
            raw = raw + str[i];
        }
    }

    return newStr;
}

//String remove
const strRmv = function (str, chr)
{
    let newStr = str.replace(chr, '').trim();
    
    if (newStr === '+' || newStr === '')
        newStr = '1';
    else if (newStr === '-')
        newStr = '-1';
    
    return newStr;
}


//Dot Product
const dotProduct = function (ax, ay, az, bx, by, bz)
{
    const result = (ax * bx) + (ay * by) + (az * bz);
    return result;
}


//Cross Product
const crossProduct = function (ax, ay, az, bx, by, bz)
{
    const iComponent = (ay * bz) - (by * az);
    const jComponent = (bx * az) - (ax * bz);
    const kComponent = (ax * by) - (bx * ay);
    
    let result = `${iComponent}i`;

    if (jComponent < 0)
        result = result + `${jComponent}j`;
    else
        result = result + `+${jComponent}j`;
    
    if (kComponent < 0)
        result = result + `${kComponent}k`;
    else
        result = result + `+${kComponent}k`;
    
    return result;
}



//flash Message function
function flashMessage(msg, time)
{
    const flash = document.querySelector(".flash");
    const newPara = document.createElement("p");
    newPara.classList.add('flash--message');
    newPara.innerHTML = `${msg}`;
    flash.appendChild(newPara);
    
    setTimeout(function ()
    {
        flash.removeChild(newPara);
    }, time);
}

//Clear function
document.querySelector(".clear").addEventListener("click", function ()
{
    console.log("clear button clicked");
    const vectors = document.querySelectorAll(".vector");
    for (const vector of vectors)
    {
        if (vector.value != '')
        {
            vector.value = '';
            flashMessage('Vector fields Cleared', 1000);
        }
        else
        {
            flashMessage("Vector fields are already cleared!!", 1000);
        }
    }

    const vectorOutput = document.querySelectorAll(".vector--output");

    for (const output of vectorOutput) {
        output.classList.add("hidden");
    }
});

