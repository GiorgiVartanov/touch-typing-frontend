import Typer from "../../components/Typer/Typer"

const TypingSettingsTextExample = () => {
  // const text =
  //   "your text will look like this, words after that are only for length, so you will see how this text looks on more than one line."
  const text =
    "იორ ტექსტ წილლ ლოოკ ლიკე ტჰის, წორდს აფტერ ტჰატ არე ონლყ ფორ ლენგტჰ, სო უოი წილლ სეე ჰოწ ტჰის ტეხტ ლოოკს ონ მორე ტჰან ონე ლინე."

  return (
    <div className="text-example ">
      <p>text example</p>
      <Typer text={text} />
    </div>
  )
}
export default TypingSettingsTextExample
