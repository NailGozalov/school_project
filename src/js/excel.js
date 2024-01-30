document.getElementById('downloadExcel').addEventListener('click', function () {
    // Создаем новый Workbook
    var wb = XLSX.utils.book_new();
    
    // Получаем данные из таблицы
    var table = document.getElementById('resultsTable');
    var rows = Array.from(table.querySelectorAll('tbody tr'));
    var data = rows.map(row => Array.from(row.cells).slice(1).map(cell => cell.textContent)); // Используем slice(1), чтобы пропустить первую ячейку с номером
    
    // Создаем массив с названиями блюд
    var headers = ['Soup', 'Salad', 'Main course', 'Compote', 'Garnish', 'Date & Time'];
    
    // Создаем лист
    var ws = XLSX.utils.book_new();
    
    // Устанавливаем данные
    XLSX.utils.sheet_add_aoa(ws, [headers, ...data]);
    
    // Устанавливаем стили для заголовков
    var headerStyle = { font: { bold: true } };
    headers.forEach((header, i) => {
        var cellAddress = XLSX.utils.encode_cell({ c: i, r: 0 }); // Получаем адрес ячейки
        ws[cellAddress].s = headerStyle; // Применяем стиль к ячейке
    });
    
    // Устанавливаем ширину ячеек
    var columnWidths = [15, 15, 15, 15, 15, 20]; // Ширина каждой ячейки
    columnWidths.forEach((width, i) => {
        var colAddress = XLSX.utils.encode_col(i);
        ws['!cols'] = ws['!cols'] || [];
        ws['!cols'].push({ wch: width }); // Устанавливаем ширину колонки в символах
    });
    
    // Добавляем лист к книге
    XLSX.utils.book_append_sheet(wb, ws, "Результаты");
    
    // Сохраняем файл Excel
    XLSX.writeFile(wb, 'результаты.xlsx');
});



