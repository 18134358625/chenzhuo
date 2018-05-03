(function () {
    var optionFlag = "save";
    var updateRowIndex = -1;
    var checkFlag = false;//默认为不显示
    function show() {
        optionFlag = "save";
        var f = document.getElementById("did");//获得id为did的 div
        if (!checkFlag) {
            f.style.visibility = "visible";
        } else {
            f.style.visibility = "hidden";
        }
        checkFlag = !checkFlag;
    }

    //通过保存按钮将数据添加到表格中
    function insertRow_() {
        switch (optionFlag) {
            case "save" :
                insertRow_$save();
                break;
            case "update" :
                insertRow_$update();
                break;
            default :
                alert("操作失败！！");
        }

        function insertRow_$save() {
            //通过id获得要添加数据的表格
            var table = document.getElementById("tableid");

            //将所输入的内容赋给定义的变量
            var titleName = document.getElementById("title").value;
            var digestName = document.getElementById("digest").value;
            var authorName = document.getElementById("author").value;
            //获取下拉框内的内容
            var selectIndex_ = document.getElementById("select");
            var option = selectIndex_.options[selectIndex_.selectedIndex];
            var selectName = option.text;

            //获取编号的内容
            var numberid = table.rows.length;

            //在表尾添加一行数据
            var row_ = table.insertRow(table.rows.length);

            row_.insertCell(0).innerHTML = numberid;
            row_.insertCell(1).innerHTML = titleName;
            row_.insertCell(2).innerHTML = digestName;
            row_.insertCell(3).innerHTML = authorName;
            row_.insertCell(4).innerHTML = selectName;
            row_.insertCell(5).innerHTML = '<input type="button" value="修改" onclick="update_(this.parentNode.parentNode)"></input>&nbsp;<input type="button" value="删除" onclick="delete_(this.parentNode.parentNode)"></input>';

            document.getElementById("title").value = "";
            document.getElementById("digest").value = "";
            document.getElementById("author").value = "";
            document.getElementById("select").options[0].selected = "true";

            var f = document.getElementById("did");
            f.style.visibility = "hidden";

            alert("insert数据成功！！");
        }

        //修改后的保存
        var tr;

        function insertRow_$update() {
            var table = document.getElementById("tableid");
            tr = table.rows[updateRowIndex];

            var p = document.getElementById("title");
            tr.cells[1].innerHTML = p.value;

            p = document.getElementById("digest");
            tr.cells[2].innerHTML = p.value;

            p = document.getElementById("author");
            tr.cells[3].innerHTML = p.value;

            p = document.getElementById("select");
            var Index_ = p.selectedIndex;
            var option = p.options[Index_];
            var selectName = option.text;
            tr.cells[4].innerHTML = selectName;

            document.getElementById("title").value = "";
            document.getElementById("digest").value = "";
            document.getElementById("author").value = "";
            document.getElementById("select").options[0].selected = "true";

            var f = document.getElementById("did");
            f.style.visibility = "hidden";

            alert("update数据成功！！");
        }
    }

    //通过删除按钮  删除当前所在行
    function delete_(row_) {
        var table = document.getElementById("tableid");
        table.deleteRow(row_.rowIndex);

        refurbish_();
        alert("delete数据成功！！");
    }

    //刷新
    function refurbish_() {
        var table = document.getElementById("tableid");
        //获得table的行数
        var rows = table.rows;
        for (var i = 1; i < rows.length; i++) {
            rows[i].cells[0].innerHTML = i;
        }
    }

    //通修改按钮对table里的数据进行修改
    function update_(row) {
        updateRowIndex = row.rowIndex;
        optionFlag = "update";
        //对table里的数据进行回显
        document.getElementById("title").value = row.cells[1].innerHTML;
        document.getElementById("digest").value = row.cells[2].innerHTML;
        document.getElementById("author").value = row.cells[3].innerHTML;
        var selectText = row.cells[4].innerHTML;
        var sel = document.getElementById("select");
        var ops = sel.options;
        for (var i = 0; i < ops.length; i++) {
            if (selectText == ops[i].text) {
                sel.options[i].selected = "true";
            }
        }
        var f = document.getElementById("did");
        f.style.visibility = "visible";
    }
});