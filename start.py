import numpy as np
import matplotlib.pyplot as plt

def compare(a,b,stringency):
    count=0
    la=len(a)
    for i in range(la):
        if a[i]==b[i]:
            count+=1
            if(count==stringency):
                return[i,i];
    return False
def answer(name1,name2,s,stringency):
    l1=len(name1)
    l2=len(name2)
    dataset=[]
    for i in range(l1-s+1):
        k=name1[i:i+s]
        for j in range(l2-s+1):
            t=compare(k,name2[j:j+s],stringency)
            if t!=False:
                dataset+=[(i+t[0],j+t[1])]
    return dataset

def make_plot(array,name1,name2,ax=None):
    l1=len(name1)
    l2=len(name2)
    ax =plt.gca()
    ax.patch.set_facecolor('gray')
    ax.set_aspect('equal', 'box')
    ax.xaxis.set_major_locator(plt.NullLocator())
    ax.yaxis.set_major_locator(plt.NullLocator())
    for (x,y) in array:
        size=1
        color='white'
        if x==y:
            color='blue'
        rect=plt.Rectangle([(2*x),(2*y)],2*size,2*size,facecolor=color,edgecolor=color)
        ax.add_patch(rect)
    ax.autoscale_view()
    x_values = list(' '.join(name1))
    y_values = list(' '.join(name2))
    x_axis = np.arange(1, 2*(l1+1), 1)
    y_axis = np.arange(1, 2*(l2+1), 1)
    plt.xticks(x_axis, x_values)
    plt.yticks(y_axis, y_values)
    #ax.hold(False)
#k=answer('tanmayyamnat','tanmayyamnat',1,1)
#make_plot(k,'tanmayyamnat','tanmayyamnat')
'''

def hinton(matrix, max_weight=None, ax=None):
    """Draw Hinton diagram for visualizing a weight matrix."""
    ax = ax if ax is not None else plt.gca()

    if not max_weight:
        max_weight = 2**np.ceil(np.log(np.abs(matrix).max())/np.log(2))
    print max_weight
    ax.patch.set_facecolor('gray')
    ax.set_aspect('equal', 'box')
    ax.xaxis.set_major_locator(plt.NullLocator())
    ax.yaxis.set_major_locator(plt.NullLocator())

    for (x,y),w in np.ndenumerate(matrix):
        print x
        print y
        print w
        print '****************'
        color = 'white' if w > 0 else 'black'
        size = np.sqrt(np.abs(w))
        rect = plt.Rectangle([x - size / 2, y - size / 2], size, size,
                             facecolor=color, edgecolor=color)
        ax.add_patch(rect)

    ax.autoscale_view()
    ax.invert_yaxis()


if __name__ == '__main__':
    hinton(np.random.rand(20, 20) - 0.5)
    plt.show()
'''
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
import urlparse
PORT_NUMBER = 80
class myHandler(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
    def do_GET(self):
        self.send_response(200)
        parsed_path=urlparse.urlparse(self.path)
        x=parsed_path.path[1:]
        print x
        x=x.split('/')
        print x
        if len(x)==2:
            print 'yes'
            name1=x[0]
            name2=x[1]
        else:
            self.wfile.write('Incorrect URL')
            return
        # Send the html message
        k=answer(name1,name2,1,1)
        make_plot(k,name1,name2)
        plt.savefig('foo.png')
        plt.clf()
        plt.cla()
        import shutil,os
        self.send_response(200)
        self.send_header('Content-type', 'image/jpeg')
        self.end_headers()
        content_path='foo.png'
        with open(content_path, 'rb') as content:
            shutil.copyfileobj(content, self.wfile)
        content.close()
        os.remove('foo.png')
        return

try:
    #Create a web server and define the handler to manage the
    #incoming request
    server = HTTPServer(('', PORT_NUMBER), myHandler)
    print 'Started httpserver on port ' , PORT_NUMBER
    
    #Wait forever for incoming htto requests
    server.serve_forever()

except KeyboardInterrupt:
    print '^C received, shutting down the web server'
    server.socket.close()
