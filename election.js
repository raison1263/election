function abc(sdName) 
{
    $.ajax({
        type: 'GET',
        url: `https://popupu.herokuapp.com/http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPrePolplcOtlnmapTrnsportInfoInqire?serviceKey=iVtdG4wl1qRvI0fDb%2BZ24NdqKOIUlQv8r%2FimXnCC0qHt5H0eeO2nH4D0FoA0RDlwIfPDUOnJTUWIoEUGkIlzvw%3D%3D&pageNo=1&numOfRows=10&sgId=20220309&sdName=${sdName}`,
        dataType: 'xml',
        beforeSend: function()
        {
            $('#content').append('<div class="loading"><i class="fa-solid fa-spinner fa-spin"></i></i></div>')
        },
        complete: function()
        {
            $('#content .loading').remove();
        },
        success: function (getdata) 
        {
            console.log(getdata);
            usedata(getdata);
        },
        error: function (xhr) 
        {
            console.log(xhr.status + '/' + xhr.errorText);
        },
        
    })
}
abc('서울특별시')

function usedata(data) {

    var elem = `<ul class="placeList">`
    $(data).find('item').each(function () 
    {
        var placeName = $(this).find('placeName').text();
        var addr = $(this).find('addr').text();
        elem += `<li>`;
        elem += `<p>${placeName}</p>`;
        elem += `<p>${addr}</p>`;
        elem += `</li>`;
    })
    elem += `</ul>`;
    $('#content').append(elem);
}

$('.tabTit li').on('click', function () 
{
    var name = $(this).text();
    $('#content .placeList').remove();
    abc(name);
})