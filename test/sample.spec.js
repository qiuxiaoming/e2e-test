describe('todoList test', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Todo list');
    })

    it('should render all item correct', async function(){
        let todoList = await page.waitFor('#todoList');
        
        const flag = await page.evaluate(function(todoList){
          if(todoList.childNodes.item(0).textContent == 'React practice' && todoList.childNodes.item(1).textContent == 'game time'){
            return true;
          }else{
            return false;
          }
        }, todoList);
        expect(flag).to.eql(true);
    })

    it('should new todo correct', async function(){
      await page.type('#newItemText','inputContext',{dalay:500});
      await page.click('#addItem',{delay:500});
      let todoList = await page.waitFor('#todoList');
      let realText = await page.evaluate(function(todoList){
        return todoList.lastChild.textContent;
      },todoList);
      expect(realText).to.eql('inputContext');
    })

    it('should finish it correct', async function(){
      await page.click('#Context', {delay:500});
      let todoList = await page.waitFor('#todoList');
      const realStatus = await page.evaluate(function(todoList){
        return todoList.lastChild.className;
      },todoList)
      expect(realStatus).to.eql('done-item');
    })

    it('should cancel it correct', async function(){
      await page.click('#Context', {delay:500});
      let todoList = await page.waitFor('#todoList');
      const realStatus = await page.evaluate(function(todoList){
        return todoList.lastChild.className;
      },todoList)
      expect(realStatus).to.eql('item');
    })


    
  });
