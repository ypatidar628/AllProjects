import myimg from "../src/myImg.png"
function App(){
  return(
    <div className="w-full h-full flex">
      {/* Sidebar Section start */}
      <div className="bg-black w-[24%] h-[100%] min-h-full text-white p-4 ">
        <img src={myimg} alt="" className="w-44 ml-14 m-6 rounded-md" />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores neque eum excepturi reiciendis, fugit possimus. Minus vero possimus eveniet beatae, perspiciatis asperiores maiores, distinctio illum fugiat dignissimos earum. Voluptatum eius minus placeat praesentium quis, ratione tenetur obcaecati sit saepe, tempore doloribus officia minima et velit dolor nemo illum cum provident. Quae, eveniet accusantium. Quae quia architecto nihil a odit rem corrupti laboriosam consequatur, sapiente perferendis, dicta blanditiis aliquam explicabo molestias, eveniet iure assumenda eos ut nisi voluptate. Molestiae, consequatur tempore illum quam cumque eveniet quia officiis repudiandae laudantium blanditiis omnis eligendi iste recusandae quo aliquid, est maxime explicabo id. Dicta, fuga dolorem quaerat voluptatibus consectetur dolor facilis architecto praesentium consequuntur cupiditate dolorum omnis! Aliquam iure quia praesentium, quo nihil explicabo excepturi pariatur aliquid facere, amet necessitatibus omnis odio autem. Nisi, veritatis mollitia. Alias iure cupiditate, nisi facere doloremque rerum magnam ab nam accusamus est hic adipisci, commodi id at. Ex, quis quod ab assumenda unde distinctio ullam, repudiandae in esse, incidunt recusandae harum. Quisquam, recusandae hic similique eligendi, eaque neque temporibus consectetur asperiores molestias inventore, corporis ut vitae sapiente eveniet? Eius, nesciunt accusamus ad reprehenderit corrupti explicabo dolorum quos adipisci! Quod eum unde earum ducimus fugit, iste facere libero vitae ut placeat dolor repellat voluptas aliquid expedita. Tempore sit, voluptatibus iusto maiores repudiandae, excepturi unde quaerat soluta, sequi doloribus facere placeat saepe recusandae itaque consequatur! Nulla quibusdam ea optio suscipit in harum sint facere reprehenderit, id numquam maxime dignissimos, accusamus sunt? Sit illum voluptates itaque similique dolore autem porro corrupti!
        </p>
      </div>
      {/* Sidebar Section end */}

      {/* Main Content Section start */}
      <div className="w-[75%] p-4 bg-gradient-to-l from-[#26174e] to-[#000000] ">
        <h1 className="text-3xl text-black">Welcome to the App</h1>
      </div>
      {/* Main Content Section end */}
    </div>
  )
}

export default App;