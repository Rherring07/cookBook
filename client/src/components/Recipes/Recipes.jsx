import Recipe from '../Recipe/Recipe'

const Recipes = ({recipes}) => {
  return (
    <>
      {recipes.map((recipe,index) => (
        <Recipe key = {recipe._id} recipe = {recipe} />
      ))}

    </>
  )
}

export default Recipes