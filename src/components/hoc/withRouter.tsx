import {
    Location,
    NavigateFunction,
    Params,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom';

export interface Router {
    location: Location;
    navigate: NavigateFunction;
    params: Params;
}

export default function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}
