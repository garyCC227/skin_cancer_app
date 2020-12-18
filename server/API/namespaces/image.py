from app import api
from util.utils import *
from util.model import *
from flask_restplus import Resource, abort, reqparse, fields
import PIL.Image
from io import BytesIO
import base64
import numpy as np
from model.models import model



image = api.namespace('image', description="Predict image")

@image.route('/', strict_slashes=False)
class Image(Resource):
    @image.response(200, 'Success')
    @image.response(400, 'Malformed Request / Image could not be processed')
    @image.expect(new_image_details)
    @image.doc(description='''
           Upload image to predict
        ''')
    def post(self):
        j = get_request_json()
        (desc, src) = unpack(j, 'description', 'src')
        if desc == "":
            abort(400, "description cannot be empty")
        if src == "":
            abort(400, "src cannot be empty")

        im = self._processing(src)
        print(im.shape)

        #TODO: add model predction here
        result = model.classify(im)
        return {
            'result': result
        }

    def _processing(self, src):
        size = (256, 256)
        im = PIL.Image.open(BytesIO(base64.b64decode(src)))
        im.thumbnail(size, PIL.Image.ANTIALIAS)
        #TEST ONLY
        # im.show()
        data = np.array(im)
        return data