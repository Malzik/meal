import {FaSearch} from "react-icons/all";

export const RightPanel = () => {
    const renderItems = () => (
        <div>
            <img src="logo192.png"  alt={"Image"}/>
        </div>
    )

    return (
        <div>
            <div className="">Ajouter Element</div>
            <div className="border-4 border-white rounded-full max-w-max">
                <label htmlFor="right-panel-searchbar" className="rounded-2xl">
                    <FaSearch className="inline-block my-1 mx-1 text-gray-500"/>
                    <input className="right-panel-searchbar inline-block bg-transparent focus:outline-none" name="right-panel-searchbar"
                           type="text" placeholder="Recette, ingredient..." />
                </label>
            </div>
            <div>
                {renderItems()}
                {renderItems()}
                {renderItems()}
                {renderItems()}
            </div>
        </div>
    )
}
