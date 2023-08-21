/*
  Faça um programa que converta da notação de 24 horas para a notação de 12 horas.
  Por exemplo, o programa deve converter 14:25 em 2:25 P.M. 
  Deve haver pelo menos duas funções: uma para fazer a conversão e uma para a saída.
*/

function convertTo12HourFormat(hour, minute) {
    let period = 'A.M.';

    if (hour >= 12) {
        period = 'P.M.';
        if (hour > 12) {
            hour -= 12;
        }
    }

    if (hour === 0) {
        hour = 12; // 12 A.M. instead of 0 A.M.
    }

    return `${hour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
}


//outro modo de responder

function converter(strHoras){

    let [horas,minutos] = strHoras.split(":").map(Number);
    periodo = horas >= 12 ? "P.M.": "A.M.";

    horas = horas % 12 || 12;
    
    return {horas:horas, minutos,periodo}
}

function saida(hora) {
    horario = converter(hora)

    console.log(`Horas: ${horario.horas.toString().padStart(2,"0")}:${horario.minutos.toString().padStart(2,"0")} ${horario.periodo}`);
}

saida("11:40")
saida("00:00")
saida("12:00")
saida("14:10")
saida("02:20")