import { useState, useEffect, Fragment } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { GiClockwiseRotation, GiAnticlockwiseRotation } from 'react-icons/gi'

interface IProps {
    match: {
        params: any
    };
}

const Product: React.FC<IProps> = (props: IProps) => {
    // initial state for object features
    const [featureState, setFeatureState] = useState<any>({});
    const [image, setImage] = useState<{url: string}>();
    const [options, setOptions] = useState<any>({ code: '' });
    const [crop, setCrop] = useState({
        x: 0,
        y: 0
    });
    const [startDragPoint, setStartDragPoint] = useState<number>(1);
    // get params for dynamic client and product name
    const { name, client } = props.match.params;

    useEffect(() => {
        // fetch object features from API
        fetch(`http://content.cylindo.com/api/v2/${client}/products/${name}/configuration`)
            .then(data => data.json())
            .then((data: any) => {
                // iterate object features and store them in state
                data.features.forEach((feature: any) => {
                    setFeatureState((prevState: any) => ({ ...prevState, [feature.code]: feature.options[0].code }))
                })
                return setOptions(data);
            })
            .catch(err => console.log('cannot find product', err))
    }, [client, name]);

    useEffect(() => {
        try {
            // check if product exists
            if (options.code !== '') {
                let query: string = '';
                // populate query with all initial params
                for (const [key, value] of Object.entries(featureState)) {
                    query += `&feature=${key}:${value}`;
                  }
                // set current image from API
                setImage({
                    url: `http://content.cylindo.com/api/v2/${client}/products/${name}/frames/${startDragPoint}/?${query}${crop.x !== 0 ? `&crop=(${crop.x},${crop.y},512,512)&zoom=4k`: ''}`
                })
            }
        } catch (err) {
            console.log(err);
        }
    }, [name, featureState, crop, client, options, startDragPoint]);

    // rotate image to left - decrement by 1
    const rotateImgLeft: Function = () => {
        startDragPoint === 1 ?
            setStartDragPoint(32)
            : setStartDragPoint(Number(startDragPoint) - Number(1));
    }

    // rotate image to right - increment by 1
    const rotateImgRight: Function = () => {
        startDragPoint === 32 ?
            setStartDragPoint(Number(1))
            : setStartDragPoint(Number(startDragPoint) + Number(1));
    }
    
    // clickable product features
    const getFeatures: () => React.FC = () => {
        return options?.features?.map((feature: any) => (
            <Fragment key={feature.code}>
                <Row className="featureCodeRow">
                    <Col>
                        <h3>{feature.code}</h3>
                    </Col>
                </Row>
                {feature.options.map((opt: any) => {
                    return (
                        <Button
                            key={opt.code}
                            variant="outline-info"
                            className="featureButton"
                            onClick={() => 
                                // update property
                                setFeatureState({ ...featureState, [feature.code]: opt.code})
                            }
                        >
                            {opt.code}
                        </Button>
                    )
                })}
            </Fragment>
        ))
    }

    const getZoomIcon: Function = () =>
        <span
            className="zoomIconHolder"
            onClick={() => {
                crop.x === 0 ?
                    setCrop({ x: 1000, y: 1000 })
                    : setCrop({ x: 0, y: 0 })
            }}
        >
            {crop.x === 0 ?
                <AiOutlineZoomIn className="zoomIcon"/>
                : <AiOutlineZoomOut className="zoomIcon"/>
            }
        </span>

    return (
        <Row className="productRow">
            <Col sm={12} md={8} lg={6}>
                <div>
                    {/* range input slider for dragging over image overlay */}
                    <input 
                        className="dragSlider"
                        type="range"
                        min="1"
                        max="32"
                        defaultValue={startDragPoint}
                        // change active image based on dragging position
                        onChange={(e: any) => setStartDragPoint(e.target.value)}
                        onMouseMove={(e) => {
                            // set crop params based on page coordinates if zoomed in
                            crop.x !== 0 && setCrop({ x: e.pageX, y: e.pageY })
                        }}
                    />
                    {getZoomIcon()}
                    <Image
                        className="productImage"
                        src={image?.url}
                        alt="furniture"
                    />
                </div>
                <Row>
                    <Col className="text-center">
                        <Button
                            variant="outline-info"
                            className="featureButton"
                            disabled={crop.x !== 0}
                            onClick={() => rotateImgLeft()}
                        >
                            <GiAnticlockwiseRotation />
                        </Button>
                        <Button
                            variant="outline-info"
                            className="featureButton"
                            disabled={crop.x !== 0}
                            onClick={() => rotateImgRight()}
                        >
                            <GiClockwiseRotation />
                        </Button>
                    </Col>
                </Row>
            </Col>

            <Col sm={12} md={4} lg={6} className="productDescription">
                <div>
                <h2>{options.code}</h2>
                {getFeatures()}
                </div>
            </Col>
        </Row>
    )
};

export default Product;