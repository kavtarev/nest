const btn = document.getElementById('btn');
const whateverBtn = document.getElementById('list-whatever-btn');
const div = document.getElementById('list-whatever');

btn.addEventListener('click', () => {
  alert('i am alive');
});

whateverBtn.addEventListener('click', async () => {
  const res = await fetch('http://localhost:3003', {
    method: 'POST',
    body: JSON.stringify([{ what: 'ever' }]),
  });

  let json = await res.json();

  json.forEach((element, i) => {
    let span = document.createElement('span');
    span.textContent = `${i}) ${element['what']}`;
    div.append(span);
    div.insertAdjacentHTML('beforeend', '<br></br>');
  });
});
