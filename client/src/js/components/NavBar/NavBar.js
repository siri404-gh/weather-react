var React = require('react');
var Link = require('react-router').Link;

var NavBar = React.createClass({
    render: function() {
        return (
            <header>
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand" href="/"><span className='glyphicon glyphicon-cloud'> Weather</span></a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/home"><span className='glyphicon glyphicon-home'> Home </span></Link></li>
                      </ul>
                    </div>
                  </div>
                </nav>
            </header>
        );
    }
});

module.exports = NavBar;
