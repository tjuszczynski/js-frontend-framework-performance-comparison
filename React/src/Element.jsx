const React = require('react');

export class Element extends React.Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.data !== this.props.data || nextProps.style!== this.props.style;
    }

    onSelect(e) {
        e.stopPropagation();
        this.props.onSelect(this.props.data.id);
    }

    onDelete(e) {
        e.stopPropagation();
        this.props.onDelete(this.props.data.id);
    }

    render() {
        const {style, data} = this.props;
        return (<div className={style}
                     onClick={this.onSelect}>
                <div>{data.id + " " + data.label}
                    <span className="glyphicon glyphicon-remove pull-right" onClick={this.onDelete}></span></div>
            </div>
        );
    }
}