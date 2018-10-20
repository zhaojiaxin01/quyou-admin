$(function () {
    $('#hidebtn').click(() => {
        $('#leftSide').hide(1000);
        $('#hidebtn').hide();
        $('#showbtn').show(1000);
    });
    $('#showbtn').click(() => {
        $('#leftSide').show(1000);
        $('#showbtn').hide();
        $('#hidebtn').show(1000);
    });
})