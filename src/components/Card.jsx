export default function Card({ tag, content, username }) {
  return (
    <div className="card bg-green-200 h-80 w-64 flex flex-col items-center overflow-hidden rounded-xl">
      <header className="bg-blue-100 min-h-24 w-full ">
        <p className="text-center pt-5 font-montserrat">{tag}</p>
      </header>
      <section className="max-w-[80%]">
        <p className="my-5 text-center font-protestRiot italic">{username}</p>

        <p className="text-center font-montserrat">{content}</p>
      </section>
    </div>
  );
}
