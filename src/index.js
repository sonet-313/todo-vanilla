import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  returnIncompleteList(inputText);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに戻す関数
const returnIncompleteList = (text) => {
  //liタグ生成
  const li = document.createElement("li");
  li.className = "list-item";
  const div = document.createElement("div");
  div.className = "list-row";
  const p = document.createElement("p");
  p.innerText = text;

  //buttonタグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";

  //完了ボタンを押したとき
  completeButton.addEventListener("click", () => {
    deleteFromIncompleteList(completeButton.parentNode.parentNode);
    //完了リストに追加する要素
    const addTarget = completeButton.parentNode.parentNode;
    //todo内容テキストを取得
    const text = addTarget.firstElementChild.firstElementChild.innerHTML;
    addTarget.innerHTML = null;

    const div = document.createElement("div");
    div.className = "list-row";
    const p = document.createElement("p");
    p.innerText = text;
    const backButton = document.createElement("button");
    backButton.innerHTML = "戻す";
    //戻すボタンを押したとき
    backButton.addEventListener("click", () => {
      const deleteTarget = backButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキスト取得
      const text = deleteTarget.firstElementChild.firstElementChild.innerText;
      returnIncompleteList(text);
    });

    div.appendChild(p);
    div.appendChild(backButton);
    addTarget.appendChild(div);

    document.getElementById("complete-list").appendChild(addTarget);
  });

  //押された削除ボタンの項目を削除
  deleteButton.addEventListener("click", () => {
    deleteFromIncompleteList(deleteButton.parentNode.parentNode);
  });

  //liタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  //未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(li);
};
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
