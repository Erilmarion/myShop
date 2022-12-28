import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="134" cy="137" r="132"/>
        <circle cx="120" cy="214" r="13"/>
        <rect x="0" y="281" rx="10" ry="10" width="277" height="26"/>
        <rect x="2" y="323" rx="10" ry="10" width="280" height="88"/>
        <rect x="12" y="428" rx="20" ry="20" width="90" height="28"/>
        <rect x="117" y="420" rx="20" ry="20" width="153" height="45"/>
    </ContentLoader>
)

export default Skeleton
