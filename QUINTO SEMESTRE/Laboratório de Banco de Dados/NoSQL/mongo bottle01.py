import bottle

#this is the handler for the root address on the web browser
@bottle.route('/')
def home_page():
  return 'Hello Bottle World\n'

@bottle.route('/testpage')
def test_page():
  return 'Oficina MongoDB e Python no FISL'

bottle.debug(True)
bottle.run(host='localhost', port = 8082)
