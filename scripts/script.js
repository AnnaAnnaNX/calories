$(document).ready(function() {

//доп функции
function d(x1,y1,x2,y2){
  return Math.pow(Math.pow(x1-x2,2)+Math.pow(y1-y2,2),.5);
}
console.log(d(1,0,2,0));//1
console.log(d(0,1,0,2));//1
//вычисление площади треугольника
function S(x1,y1,x2,y2,x3,y3){
  var a,b,c,p;
  a = d(x1,y1,x2,y2);
  b = d(x2,y2,x3,y3);
  c = d(x1,y1,x3,y3);
  p = (a+b+c)/2;
  return Math.pow(p*(p-a)*(p-b)*(p-c),0.5)
}
console.log(S(1,0,0,1,0,0).toFixed(3));//0.5
function f(x,x1,y1,x2,y2){
  return (x-x1)*(y2-y1)/(x2-x1)+y1;
}
console.log(f(3,1,1,2,2));//3



  var points = [];//точки
  var Spolynom = 0;//площадь многоугольника
  var count = 0, i = 0;

  points = [
      {x:2,y:3},
      {x:4,y:4},
      {x:5,y:2},
      {x:3,y:1}
  ];
  //вывод введенных точек
  for(var i=0;i<points.length;i++){
      $('.points').append('<li>'+(i+1)+'. ('+points[i].x+'; '+points[i].y+')</li>');
  };
  //ввод координат точки
  $('.input-point').click(function(){
    var newX,newY,optS;

    $('.error').text('');

    newX = $('.new-x').val();
    newY = $('.new-y').val();

    //проверка, что введены числа
    if ( !($.isNumeric(newX) && $.isNumeric(newY)) ){
      $('.error').text('Неверное значение точки');
      return;
    }

    //проверка, вычисление площади полученного последнего треугольника
    var j = points.length;
    if ( j>=2 ){
      optS = S(points[0].x,points[0].y,points[j-1].x,points[j-1].y,newX,newY);
      if ( optS<=0 ){
        $('.error').text('Неверное значение точки.Данная точка не добавляет объема.');
        return;
      }
    }

    //проверка, что все точки по одну сторону от прямой

    //x1!=x2
    if ( newX == points[j-1].x ){
      $('.error').text('неподходящее значение координаты x');
      return;
    }

    //проанрка каждой точки
    for (count=0,i=0;i<j-1;i++){
      if ( points[i].y>f(points[i].x,points[j-1].x,points[j-1].y,newX,newY) ){
          count++;
      }
      else{
          count--;
      }
    }
    console.log('count '+count);
    console.log('j-1 '+(j-1));
    if ( count != j-1 ){
      $('.error').text('многоугольник не выпуклый');
      return;
    }

    console.log('success');

  });


});
